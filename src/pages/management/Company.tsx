import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Avatar, TablePagination, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar
} from '@mui/material';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { useEffect } from 'react';
import axios from '../../utils/axiosInstance';
import MuiAlert, { type AlertColor } from '@mui/material/Alert';


interface CompanyType {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  photo: string;
  userName: string;
  address: string;
  pdfUrl: string;
}

const Company = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<CompanyType | null>(null);
  const [partners, setPartners] = useState<CompanyType[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    axios.get('/companies')
      .then((res) => {
        const mappedCompanies = res.data.data.map((company: any) => ({
          id: company.id,
          name: company.name,
          phone: company.phoneNumber,
          email: company.email,
          status: company.isApproved ? 'Đang hoạt động' : 'Tạm ngưng',
          photo: company.avatarUrl || 'https://via.placeholder.com/40',
          userName: company.userName,
          address: company.address,
        }));
        setPartners(mappedCompanies);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);


  // Sử dụng trong hàm
  const handleOpenEdit = (mockPartners: CompanyType) => {
    setSelectedPartner(mockPartners);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedPartner(null);
  };

  const handleEditChange = (field: keyof CompanyType, value: string) => {
    setSelectedPartner((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleSaveEdit = () => {
    if (!selectedPartner) return;

    const updatedData = {
      name: selectedPartner.name,
      phoneNumber: selectedPartner.phone,
      email: selectedPartner.email,
      address: selectedPartner.address,
      avatarUrl: selectedPartner.photo,
      pdfUrl: selectedPartner.pdfUrl || '', // 👈 thêm dòng này
    };

    const url = `/companies/${selectedPartner.id}`;

    console.log('📤 Đang gửi PUT request đến:', url);
    console.log('📤 Request Body:', updatedData);

    axios.put(url, updatedData)
      .then((res) => {
        console.log('✅ Response Data:', res.data);
        console.log('📨 Request Headers:', res.config.headers);
        console.log('📨 Request Body (raw):', res.config.data); // dạng JSON string

        setPartners((prev) =>
          prev.map((p) =>
            p.id === selectedPartner.id ? { ...p, ...selectedPartner } : p
          )
        );
        handleCloseEdit();
        showSnackbar('Cập nhật thành công!', 'success');
      })
      .catch((err) => {
        if (err.response) {
          console.error('❌ Response Error Data:', err.response.data);
          console.error('❌ Status:', err.response.status);
          console.error('❌ Headers:', err.response.headers);
          console.error('❌ Request Sent:', err.config.data); // xem dữ liệu gửi lên
          showSnackbar(`Lỗi xác thực: ${JSON.stringify(err.response.data.errors ?? err.response.data)}`, 'error');
        } else {
          console.error('❌ Lỗi không có response (network, timeout?):', err);
          showSnackbar('Có lỗi xảy ra. Vui lòng thử lại.', 'error');
        }
      });

  };



  // Trong component:
  const [partnerToDelete, setPartnerToDelete] = useState<CompanyType | null>(null);

  const handleOpenDelete = (partner: CompanyType) => {
    setPartnerToDelete(partner);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setPartnerToDelete(null);
  };

  const handleDeleteConfirmed = () => {
    if (!partnerToDelete) return;

    const url = `/companies/${partnerToDelete.id}`;
    console.log("🗑️ Xoá đối tác với ID:", partnerToDelete.id);

    axios.delete(url)
      .then((res) => {
        console.log("Đã xoá thành công:", res.data);
        setPartners((prev) => prev.filter((p) => p.id !== partnerToDelete.id));
        setOpenDelete(false);
        setPartnerToDelete(null);
        showSnackbar('Xoá thành công!', 'success');
      })
      .catch((err) => {
        console.error("Lỗi khi xoá đối tác:", err);
        showSnackbar('Xoá thất bại. Vui lòng thử lại.', 'error');
      });

  };

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = partners.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      {/* Container phần còn lại */}
      <div className="flex-1 relative flex flex-col overflow-hidden">

        {/* Background ảnh thiên nhiên trắng đen */}
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-80 opacity-150"
          style={{
            backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
          }}
        ></div>

        {/* Overlay vàng kem vanilla phủ lên ảnh */}
        <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>

        {/* Nội dung Navbar + Main */}
        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <div className="p-6">
            <h1
              className="text-center flex items-center justify-center h-[50px]" // h-[100px] để canh giữa dọc
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '40px',
                lineHeight: '100%',
                letterSpacing: '0.1em', // 10% = 0.1em
                color: '#215b5b',
              }}
            >
              Đối tác
            </h1>
            <div className="flex flex-wrap gap-4 items-center mb-6">
              {/* Tìm kiếm */}
              <TextField
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Ảnh</strong></TableCell>
                    <TableCell><strong>Tên công ty</strong></TableCell>
                    <TableCell><strong>Người đại diện</strong></TableCell>
                    <TableCell><strong>Địa chỉ</strong></TableCell>
                    <TableCell><strong>SĐT</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Trạng thái</strong></TableCell>
                    <TableCell><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <Avatar src={company.photo} alt={company.name} />
                      </TableCell>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.userName}</TableCell>
                      <TableCell>{company.address}</TableCell>
                      <TableCell>{company.phone}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.status}</TableCell>
                      <TableCell>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(company)}>
                          <FiEdit />
                        </IconButton>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(company)}>
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                component="div"
                count={filteredRows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số dòng mỗi trang"
              />
            </TableContainer>
          </div>
        </div>
      </div>
      {selectedPartner && (
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
            Chỉnh sửa đối tác
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
            <TextField
              label="Tên công ty"
              fullWidth
              margin="dense"
              value={selectedPartner.name}
              onChange={(e) => handleEditChange('name', e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="dense"
              value={selectedPartner.email}
              onChange={(e) => handleEditChange('email', e.target.value)}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              margin="dense"
              value={selectedPartner.phone}
              onChange={(e) => handleEditChange('phone', e.target.value)}
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              margin="dense"
              value={selectedPartner.address}
              onChange={(e) => handleEditChange('address', e.target.value)}
            />
            <TextField
              label="Link ảnh đại diện"
              fullWidth
              margin="dense"
              value={selectedPartner.photo}
              onChange={(e) => handleEditChange('photo', e.target.value)}
            />
            <TextField
              label="PDF URL"
              fullWidth
              margin="dense"
              value={selectedPartner.pdfUrl}
              onChange={(e) => handleEditChange('pdfUrl', e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#faebce' }}>
            <Button
              onClick={handleCloseEdit}
              variant="outlined"
              sx={{ color: '#215858', borderColor: '#215858' }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSaveEdit}
              variant="contained"
              sx={{
                backgroundColor: '#215858',
                color: 'white',
                '&:hover': { backgroundColor: '#1a4646' },
              }}
            >
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {partnerToDelete && (
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
            Xác nhận xoá đối tác
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
            <p>Bạn có chắc chắn muốn xoá <strong>{partnerToDelete?.name}</strong> không?</p>

            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Avatar
                src={partnerToDelete.photo}
                alt={partnerToDelete.name}
                sx={{ width: 80, height: 80, margin: 'auto' }}
              />
            </div>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#faebce' }}>
            <Button
              onClick={handleDeleteConfirmed}
              variant="contained"
              sx={{
                backgroundColor: '#7a1e1e',
                color: 'white',
                '&:hover': { backgroundColor: '#5c1515' },
              }}
            >
              Xoá
            </Button>
            <Button
              onClick={handleCloseDelete}
              variant="outlined"
              sx={{ color: '#7a1e1e', borderColor: '#7a1e1e' }}
            >
              Huỷ
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div >
  );
};

export default Company;