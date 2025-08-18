import Sidebar from '../../components/thirdparty/Sidebar';
import Navbar from '../../components/thirdparty/Navbar';
import {
  Paper,
  Button,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemText,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

interface SellerPackageInfo {
  packageId: string;
  packageName: string;
  packageImageUrl: string;
  currentAgency: number;
  totalAgency: number;
  remainingDay: number;
  reachedPeople: number;
}

interface PackageItem {
  id: string;
  name: string;
  description: string;
  maxAgency: number;
  price: number;
  isDeleted: boolean;
}

const ThirdpartyPackage = () => {
  const [registeredPackage, setRegisteredPackage] = useState<SellerPackageInfo | null>(null);
  const [availablePackages, setAvailablePackages] = useState<PackageItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [isRenewing, setIsRenewing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const Alert = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  useEffect(() => {
    const fetchRegisteredPackage = async () => {
      try {
        const response = await axiosInstance.get('/third-party/sellerpackage-info');
        console.log("👉 sellerpackage-info response:", response.data);

        if (response.data.success && response.data.data) {
          setRegisteredPackage(response.data.data);
        } else {
          setRegisteredPackage(null);
        }
      } catch (error) {
        console.warn("Không có gói hiện tại hoặc lỗi khi lấy package info:", error);
        setRegisteredPackage(null);
      }

      // ✅ Luôn load danh sách gói cho user chọn
      try {
        const res = await axiosInstance.get('/sellerpackages');
        console.log("👉 sellerpackages response:", res.data);

        const packages = res.data.data.filter((pkg: PackageItem) => !pkg.isDeleted);
        setAvailablePackages(packages);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gói:", error);
      }
    };

    fetchRegisteredPackage();
  }, []);





  // Nâng cấp gói - mở dialog + lấy danh sách gói khả dụng
  const handleUpgradeClick = async () => {
    try {
      const res = await axiosInstance.get('/sellerpackages');
      const packages = res.data.data.filter((pkg: PackageItem) =>
        !pkg.isDeleted && pkg.id !== registeredPackage?.packageId
      );
      setAvailablePackages(packages);
      setIsRenewing(false); // ← Đặt lại đúng trạng thái
      setOpenDialog(true);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách gói:', err);
    }
  };


  // Gia hạn gói hiện tại
  const handleRenew = async () => {
    try {
      const res = await axiosInstance.post(`/transaction/payment-links`, {
        sellerPackageId: registeredPackage?.packageId,
        month: selectedMonth,
      });

      const checkoutUrl = res.data?.data?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error("Không tìm thấy checkoutUrl", res.data);
        alert("Có lỗi xảy ra khi tạo link thanh toán.");
      }
    } catch (err) {
      console.error("Lỗi khi tạo link thanh toán:", err);
      alert("Có lỗi xảy ra khi gia hạn gói.");
    }
  };


  // Chọn gói nâng cấp
  const handleChoosePackage = (pkg: PackageItem) => {
    setSelectedPackage(pkg); // chỉ lưu lại gói được chọn
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPackage) {
      setSnackbarMessage('Vui lòng chọn gói');
      setSnackbarOpen(true);
      return;
    }

    try {
      const res = await axiosInstance.post('/transaction/payment-links', {
        sellerPackageId: selectedPackage.id,
        month: selectedMonth,
      });

      const checkoutUrl = res.data?.data?.checkoutUrl;

      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      } else {
        setSnackbarMessage('Không tạo được link thanh toán.');
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.error('Lỗi khi nâng cấp gói:', error);
      setSnackbarMessage(error?.response?.data?.message || error.message || 'Đã xảy ra lỗi');
      setSnackbarOpen(true);
    }
  };



  const handleRenewClick = () => {
    setIsRenewing(true);
    setOpenDialog(true);
  };


  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Background & overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-80 opacity-150"
          style={{
            backgroundImage:
              "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
            <h1
              className="text-center flex items-center justify-center h-[50px]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '40px',
                letterSpacing: '0.1em',
                color: '#215b5b',
              }}
            >
              Gói đăng ký
            </h1>

            <div style={{ padding: '24px' }}>
              {registeredPackage ? (
                // Nếu đã có gói → giữ nguyên code cũ
                <Paper
                  className="rounded-xl mb-6"
                  elevation={3}
                  sx={{ backgroundColor: '#fffdf6', p: { xs: 3, md: 5 } }}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Thông tin gói */}
                    <div className="flex items-center gap-5 w-full md:w-2/3">
                      <Box
                        sx={{
                          width: 112,
                          height: 112,
                          backgroundColor: '#dbe7e5',
                          borderRadius: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={registeredPackage.packageImageUrl}
                          alt={registeredPackage.packageName}
                          className="object-cover w-24 h-24 rounded"
                        />
                      </Box>

                      <Box>
                        <Typography variant="h6" color="#215b5b" fontWeight="600">
                          {registeredPackage.packageName}
                        </Typography>

                        <Typography variant="body2" mt={1}>
                          <strong>Chi nhánh:</strong> {registeredPackage.currentAgency}/{registeredPackage.totalAgency}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Thời gian còn lại:</strong> {registeredPackage.remainingDay} ngày
                        </Typography>
                        <Typography variant="body2">
                          <strong>Lượt tiếp cận trong tháng:</strong> {registeredPackage.reachedPeople} lượt
                        </Typography>
                      </Box>
                    </div>

                    {/* Các nút thao tác */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 w-full md:w-1/3">
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleUpgradeClick}
                        sx={{
                          backgroundColor: '#215b5b',
                          '&:hover': { backgroundColor: '#1b4a4a' },
                          px: 3,
                        }}
                      >
                        Thay đổi gói
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleRenewClick}
                        sx={{
                          borderColor: '#215b5b',
                          color: '#215b5b',
                          '&:hover': {
                            borderColor: '#1b4a4a',
                            color: '#1b4a4a',
                          },
                          px: 3,
                        }}
                      >
                        Gia hạn
                      </Button>
                    </div>
                  </div>
                </Paper>
              ) : (
                // Nếu chưa có gói → hiện danh sách gói
                <Paper
                  className="rounded-xl mb-6"
                  elevation={3}
                  sx={{ backgroundColor: '#fffdf6', p: { xs: 3, md: 5 } }}
                >
                  <Typography variant="h6" color="#215b5b" fontWeight="600" mb={2}>
                    Bạn chưa đăng ký gói nào. Vui lòng chọn gói để bắt đầu:
                  </Typography>
                  <List>
                    {availablePackages.map((pkg) => (
                      <ListItemButton
                        key={pkg.id}
                        selected={selectedPackage?.id === pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        sx={{
                          mb: 1,
                          borderRadius: 2,
                          backgroundColor: selectedPackage?.id === pkg.id ? '#e0f2f1' : '#f5f5f5',
                          border: selectedPackage?.id === pkg.id ? '2px solid #215b5b' : '1px solid #ccc',
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography sx={{ fontWeight: 600, color: '#215b5b' }}>
                              {pkg.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" sx={{ color: '#555' }}>
                              {pkg.description} — {pkg.price.toLocaleString()} VNĐ
                            </Typography>
                          }
                        />
                        {selectedPackage?.id === pkg.id && (
                          <CheckCircleIcon sx={{ color: '#215b5b', ml: 2 }} />
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#215b5b' }}
                      onClick={handleConfirmUpgrade} // dùng lại logic nâng cấp
                    >
                      Đăng ký gói
                    </Button>
                  </Box>
                </Paper>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Dialog chọn gói nâng cấp */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogContent
          dividers
          sx={{
            backgroundColor: '#fffdf6',
            fontFamily: 'Inter, sans-serif',
            px: 3,
            py: 2,
          }}
        >
          {/* Chọn số tháng */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#215b5b',
                fontWeight: 600,
                mb: 1,
              }}
            >
              Chọn thời hạn (tháng)
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                sx={{
                  backgroundColor: '#fefae0',
                  borderRadius: 2,
                  '& .MuiSelect-select': {
                    padding: '10px 14px',
                  },
                }}
              >
                {[1, 2, 3, 6, 12].map((month) => (
                  <MenuItem key={month} value={month}>
                    {month} tháng
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Danh sách gói */}
          {!isRenewing && (
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: '#215b5b', fontWeight: 600, mb: 1 }}
              >
                Các gói khả dụng
              </Typography>
              <List>
                {availablePackages.length > 0 ? (
                  availablePackages.map((pkg) => (
                    <ListItemButton
                      key={pkg.id}
                      selected={selectedPackage?.id === pkg.id}
                      onClick={() => handleChoosePackage(pkg)}
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        backgroundColor: selectedPackage?.id === pkg.id ? '#e0f2f1' : '#f5f5f5',
                        border: selectedPackage?.id === pkg.id ? '2px solid #215b5b' : '1px solid #ccc',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          backgroundColor: '#e0f2f1',
                        },
                        boxShadow: selectedPackage?.id === pkg.id
                          ? '0 4px 10px rgba(33, 91, 91, 0.2)'
                          : '0 1px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 600, color: '#215b5b' }}>
                            {pkg.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ color: '#555' }}>
                            {pkg.description} — {pkg.price.toLocaleString()} VNĐ
                          </Typography>
                        }
                      />

                      {/* Hiện biểu tượng check khi được chọn */}
                      {selectedPackage?.id === pkg.id && (
                        <CheckCircleIcon
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            color: '#215b5b',
                            fontSize: 24,
                          }}
                        />
                      )}
                    </ListItemButton>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Không có gói nào để nâng cấp.
                  </Typography>
                )}
              </List>
            </Box>
          )}

        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              borderColor: '#215b5b',
              color: '#215b5b',
              '&:hover': {
                borderColor: '#1b4a4a',
                color: '#1b4a4a',
              },
              px: 3,
            }}
          >
            Đóng
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: '#215b5b' }}
            onClick={isRenewing ? handleRenew : handleConfirmUpgrade}
          >
            Thanh toán
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ThirdpartyPackage;