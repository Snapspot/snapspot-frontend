import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Avatar, TablePagination, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';


interface PartnerType {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  photo: string;
}

const mockPartnersList = [
  {
    id: 1,
    name: 'Studio A',
    phone: '0123456789',
    email: 'studioA@mail.com',
    status: 'Đang hoạt động',
    photo: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 2,
    name: 'Studio B',
    phone: '0987654321',
    email: 'studioB@mail.com',
    status: 'Tạm ngưng',
    photo: 'https://i.pravatar.cc/40?img=2',
  },
];
const Partner = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(null);

  // Sử dụng trong hàm
  const handleOpenEdit = (mockPartners: PartnerType) => {
    setSelectedPartner(mockPartners);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedPartner(null);
  };

  // const handleEditChange = (field, value) => {
  //   setSelectedPartner((prev) => ({ ...prev, [field]: value }));
  // };

  const handleSaveEdit = () => {
    // TODO: Gửi dữ liệu lên backend hoặc cập nhật state
    console.log('Lưu chỉnh sửa:', selectedPartner);
    handleCloseEdit();
  };


  // Trong component:
  const [partnerToDelete, setPartnerToDelete] = useState<PartnerType | null>(null);

  const handleOpenDelete = (partner: PartnerType) => {
    setPartnerToDelete(partner);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setPartnerToDelete(null);
  };

  const handleDeleteConfirmed = () => {
    if (partnerToDelete) {
      console.log("Đã xóa:", partnerToDelete);
      setOpenDelete(false);
      setPartnerToDelete(null);
    }
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

  const displayedRows = mockPartnersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      {/* Container phần còn lại */}
      <div className="flex-1 relative flex flex-col overflow-hidden">

        {/* Background ảnh thiên nhiên mờ xám trắng */}
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale brightness-125 opacity-40"
          style={{ backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')" }}
        ></div>
        {/* Overlay nâu tối phủ lên ảnh */}
        <div className="absolute inset-0 bg-[rgba(130,90,50,0.15)]"></div>

        {/* Nội dung Navbar + Main */}
        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Đối tác</h1>
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
                    <TableCell><strong>Tên đối tác</strong></TableCell>
                    <TableCell><strong>SĐT</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Trạng thái</strong></TableCell>
                    <TableCell><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map((mockPartners) => (
                    <TableRow key={mockPartners.id}>
                      <TableCell>
                        <Avatar src={mockPartners.photo} alt={mockPartners.name} />
                      </TableCell>
                      <TableCell>{mockPartners.name}</TableCell>
                      <TableCell>{mockPartners.phone}</TableCell>
                      <TableCell>{mockPartners.email}</TableCell>
                      <TableCell>{mockPartners.status}</TableCell>
                      <TableCell>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(mockPartners)}>
                          <FiEdit />
                        </IconButton>
                        <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(mockPartners)}>
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={mockPartnersList.length}
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
          <DialogTitle
            sx={{ backgroundColor: '#215858', color: 'white' }}
          >
            Chỉnh sửa đối tác
          </DialogTitle>
          <DialogContent
            sx={{ backgroundColor: '#faebce', minWidth: 400 }}
          >
            <TextField
              label="Link ảnh"
              fullWidth
              margin="dense"
              value={selectedPartner.photo}
            // onChange={(e) => handleEditChange('photo', e.target.value)}
            />
            <TextField
              label="Tên đối tác"
              fullWidth
              margin="dense"
              value={selectedPartner.name}
            // onChange={(e) => handleEditChange('name', e.target.value)}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              margin="dense"
              value={selectedPartner.phone}
            // onChange={(e) => handleEditChange('phone', e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="dense"
              value={selectedPartner.email}
            // onChange={(e) => handleEditChange('email', e.target.value)}
            />
            <TextField
              label="Trạng thái"
              select
              fullWidth
              margin="dense"
              value={selectedPartner.status}
            // onChange={(e) => handleEditChange('status', e.target.value)}
            >
              <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
              <MenuItem value="Tạm ngưng">Tạm ngưng</MenuItem>
            </TextField>
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
            <p>Bạn có chắc chắn muốn xoá đối tác <strong>{partnerToDelete?.name}</strong> không?</p>

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
    </div >
  );
};

export default Partner;