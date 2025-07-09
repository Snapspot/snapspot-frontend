import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import MuiAlert, { type AlertColor } from '@mui/material/Alert';
import axios from '../../utils/axiosInstance';

const AgencyService = () => {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [newService, setNewService] = useState({
    name: '',
    color: '',
  });

  useEffect(() => {
    axios.get('/agencyservices')
      .then(res => {
        console.log("📥 Dịch vụ nhận được:", res.data); // ← kiểm tra có dịch vụ vừa thêm không
        setServices(res.data);
      })
      .catch(err => {
        console.error('Lỗi khi tải danh sách dịch vụ:', err);
      });
  }, []);

  const handleOpenEdit = (service: any) => {
    setSelectedService(service);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedService(null);
  };

  const handleEditChange = (field: string, value: string) => {
    if (selectedService) {
      setSelectedService({ ...selectedService, [field]: value });
    }
  };

  const handleSaveEdit = () => {
    const payload = {
      name: selectedService.name,
      color: selectedService.color,
    };

    axios.put(`/agencyservices/${selectedService.id}`, payload)
      .then(res => {
        setServices(prev =>
          prev.map(s => (s.id === selectedService.id ? res.data : s))
        );
        setSnackbarMessage('Cập nhật dịch vụ thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEdit();
      })
      .catch(err => {
        console.error('Lỗi khi cập nhật dịch vụ:', err);
        setSnackbarMessage('Lỗi khi cập nhật dịch vụ!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });

  };

  const handleOpenDelete = (service: any) => {
    setSelectedService(service);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedService(null);
  };

  const handleConfirmDelete = () => {
    axios.delete(`/agencyservices/${selectedService.id}`)
      .then(() => {
        setServices(prev => prev.filter(s => s.id !== selectedService.id));
        setSnackbarMessage('Xoá dịch vụ thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseDelete();
      })
      .catch(err => {
        console.error('Lỗi khi xoá dịch vụ:', err);
        setSnackbarMessage('Lỗi khi xoá dịch vụ!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });

  };

  const handleOpenAdd = () => {
    setNewService({ name: '', color: '' });
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAddChange = (field: string, value: string) => {
    setNewService({ ...newService, [field]: value });
  };

  const handleAddService = () => {
    const payload = {
      name: newService.name,
      color: newService.color,
    };

    axios.post('/agencyservices', payload)
      .then(res => {
        setServices(prev => [...prev, res.data]);
        setSnackbarMessage('Thêm dịch vụ thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseAdd();
      })
      .catch(err => {
        console.error('❌ Lỗi khi thêm dịch vụ:', err);
        setSnackbarMessage('Lỗi khi thêm dịch vụ!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
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

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRows = filteredServices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

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

        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
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
              Danh sách dịch vụ
            </h1>

            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <TextField
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleOpenAdd}
                sx={{
                  backgroundColor: '#215858',
                  color: 'white',
                  '&:hover': { backgroundColor: '#1a4646' },
                }}
              >
                Thêm dịch vụ
              </Button>
            </div>

            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>#</strong></TableCell>
                    <TableCell><strong>Tên dịch vụ</strong></TableCell>
                    <TableCell><strong>Màu</strong></TableCell>
                    <TableCell><strong>Trạng thái</strong></TableCell>
                    <TableCell><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map((service, index) => (
                    <TableRow key={service.id}>
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            backgroundColor: service.color,
                            width: 40,
                            height: 20,
                            borderRadius: 4,
                            border: '1px solid #ccc',
                          }}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label="Đang hoạt động"
                          color="success"
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(service)}>
                          <FiEdit />
                        </IconButton>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(service)}>
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filteredServices.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số dòng mỗi trang"
              />
            </TableContainer>
          </main>
        </div>
      </div>
      {selectedService && (
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
            Chỉnh sửa dịch vụ
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
            <TextField
              label="Tên dịch vụ"
              fullWidth
              margin="dense"
              value={selectedService.name}
              onChange={(e) => handleEditChange('name', e.target.value)}
            />
            <TextField
              label="Màu sắc (mã HEX)"
              fullWidth
              margin="dense"
              value={selectedService.color}
              onChange={(e) => handleEditChange('color', e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#faebce' }}>
            <Button onClick={handleCloseEdit} variant="outlined" sx={{ color: '#215858', borderColor: '#215858' }}>
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

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
          Thêm dịch vụ mới
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
          <TextField
            label="Tên dịch vụ"
            fullWidth
            margin="dense"
            value={newService.name}
            onChange={(e) => handleAddChange('name', e.target.value)}
          />
          <TextField
            label="Màu sắc (mã HEX)"
            fullWidth
            margin="dense"
            value={newService.color}
            onChange={(e) => handleAddChange('color', e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#faebce' }}>
          <Button onClick={handleCloseAdd} variant="outlined" sx={{ color: '#215858', borderColor: '#215858' }}>
            Hủy
          </Button>
          <Button
            onClick={handleAddService}
            variant="contained"
            sx={{
              backgroundColor: '#215858',
              color: 'white',
              '&:hover': { backgroundColor: '#1a4646' },
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {selectedService && (
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle
            sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
            Xác nhận xoá
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#faebce' }}>
            Bạn có chắc chắn muốn xoá dịch vụ <strong>{selectedService.name}</strong> không?
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#faebce' }}>
            <Button onClick={handleCloseDelete} variant="outlined"
              sx={{ color: '#7a1e1e', borderColor: '#7a1e1e' }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{
                backgroundColor: '#7a1e1e',
                color: 'white',
                '&:hover': { backgroundColor: '#5c1515' },
              }}
            >
              Xoá
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AgencyService;