import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  IconButton,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const packages = [
  {
    name: 'Gói Tiêu Chuẩn',
    description: 'Quảng bá trên các nền tảng cơ bản',
    branches: 5,
    price: '2.000.000đ',
    sold: 120,
    status: 'active',
  },
  {
    name: 'Gói Cao Cấp',
    description: 'Gồm truyền thông và mạng xã hội',
    branches: 12,
    price: '5.000.000đ',
    sold: 85,
    status: 'inactive',
  },
];

const Marketing = () => {

  const [openEdit, setOpenEdit] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const handleOpenEdit = (pkg: any) => {
    setEditingPackage({ ...pkg }); // sao chép object để tránh chỉnh trực tiếp
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingPackage(null);
  };

  const handleSaveEdit = () => {
    // TODO: gọi API hoặc cập nhật state
    console.log('Dữ liệu mới:', editingPackage);
    handleCloseEdit();
  };


  const handleOpenDelete = (pkg: any) => {
    setSelectedPackage(pkg);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedPackage(null);
  };

  const handleConfirmDelete = () => {
    // Xử lý xoá gói tại đây, ví dụ gọi API
    console.log('Đã xoá gói:', selectedPackage?.name);
    handleCloseDelete();
  };


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = packages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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

        {/* Nội dung */}
        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 overflow-auto">
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
              Danh sách gói tiếp thị
            </h1>
            <div className="flex justify-between items-center mb-4">
              <TextField
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: '#215858' }}
                onClick={() => {
                  setEditingPackage({
                    name: '',
                    description: '',
                    branches: 0,
                    price: '',
                    sold: 0,
                    status: 'active',
                  });
                  setOpenEdit(true);
                }}
              >
                Thêm gói
              </Button>
            </div>

            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Tên gói</strong></TableCell>
                    <TableCell><strong>Mô tả</strong></TableCell>
                    <TableCell><strong>Chi nhánh</strong></TableCell>
                    <TableCell><strong>Giá</strong></TableCell>
                    <TableCell><strong>Đã bán</strong></TableCell>
                    <TableCell><strong>Trạng thái</strong></TableCell>
                    <TableCell align="center"><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map((packages) => (
                    <TableRow key={packages.name}>
                      <TableCell>{packages.name}</TableCell>
                      <TableCell>{packages.description}</TableCell>
                      <TableCell>{packages.branches}</TableCell>
                      <TableCell>{packages.price}</TableCell>
                      <TableCell>{packages.sold}</TableCell>
                      <TableCell>
                        <Chip
                          label={packages.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                          color={packages.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(packages)}>
                          <FiEdit />
                        </IconButton>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(packages)}>
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={packages.length}
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
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle
          sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
          Xác nhận xoá
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#faebce' }}>
          Bạn có chắc chắn muốn xoá gói <strong>{selectedPackage?.name}</strong> không?
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#faebce' }}>
          <Button
            onClick={handleCloseDelete}
            variant="outlined"
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
              '&:hover': { backgroundColor: '#1a4646' },
            }}
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
          Chỉnh sửa gói tiếp thị
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#faebce', display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Tên gói"
            variant="outlined"
            value={editingPackage?.name || ''}
            onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Mô tả"
            variant="outlined"
            value={editingPackage?.description || ''}
            onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
            fullWidth
          />
          <TextField
            label="Số chi nhánh"
            type="number"
            variant="outlined"
            value={editingPackage?.branches || ''}
            onChange={(e) => setEditingPackage({ ...editingPackage, branches: parseInt(e.target.value) })}
            fullWidth
          />
          <TextField
            label="Giá"
            variant="outlined"
            value={editingPackage?.price || ''}
            onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
            fullWidth
          />
          <TextField
            label="Đã bán"
            type="number"
            variant="outlined"
            value={editingPackage?.sold || ''}
            onChange={(e) => setEditingPackage({ ...editingPackage, sold: parseInt(e.target.value) })}
            fullWidth
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
    </div>
  );
};

export default Marketing;
