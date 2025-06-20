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
  MenuItem,
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
const services = [
  {
    id: 1,
    name: 'Chụp ảnh',
    color: '#FFB6C1',
    status: 'active',
  },
  {
    id: 2,
    name: 'Make up',
    color: '#90EE90',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Cà phê',
    color: '#ADD8E6',
    status: 'active',
  },
];

const Service = () => {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);

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
    // TODO: Logic cập nhật dịch vụ
    console.log('Đã lưu dịch vụ:', selectedService);
    handleCloseEdit();
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
    // TODO: Logic xóa dịch vụ
    console.log('Đã xoá dịch vụ:', selectedService);
    handleCloseDelete();
  };

  // const [openAdd, setOpenAdd] = useState(false);
  // const [newService, setNewService] = useState({
  //   name: '',
  //   color: '',
  //   status: 'active',
  // });

  // const handleOpenAdd = () => {
  //   setNewService({ name: '', color: '', status: 'active' });
  //   setOpenAdd(true);
  // };

  // const handleCloseAdd = () => {
  //   setOpenAdd(false);
  // };

  // const handleAddChange = (field: string, value: string) => {
  //   setNewService({ ...newService, [field]: value });
  // };

  // const handleAddService = () => {
  //   // TODO: Logic thêm dịch vụ (gọi API hoặc cập nhật mảng services)
  //   console.log('Thêm dịch vụ mới:', newService);
  //   handleCloseAdd();
  // };


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

  const displayedRows = services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                // onClick={handleOpenAdd}
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
                  {displayedRows.map((services) => (
                    <TableRow key={services.id}>
                      <TableCell>{services.id}</TableCell>
                      <TableCell>{services.name}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            backgroundColor: services.color,
                            width: 40,
                            height: 20,
                            borderRadius: 4,
                            border: '1px solid #ccc',
                          }}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            services.status === 'active'
                              ? 'Đang hoạt động'
                              : 'Ngừng hoạt động'
                          }
                          color={services.status === 'active' ? 'success' : 'default'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(services)}>
                          <FiEdit />
                        </IconButton>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(services)}>
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={services.length}
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
            <TextField
              label="Trạng thái"
              select
              fullWidth
              margin="dense"
              value={selectedService.status}
              onChange={(e) => handleEditChange('status', e.target.value)}
            >
              <MenuItem value="active">Đang hoạt động</MenuItem>
              <MenuItem value="inactive">Ngừng hoạt động</MenuItem>
            </TextField>
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
    </div>
  );
};

export default Service;
