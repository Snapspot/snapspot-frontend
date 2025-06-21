import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Avatar, TablePagination, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { useEffect } from 'react';
import axios from '../../utils/axiosInstance';

interface PartnerType {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  photo: string;
  dob: string;
}

const Partner = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(null);
  const [partners, setPartners] = useState<PartnerType[]>([]);

  useEffect(() => {
    axios.get('/users/third-party')
      .then((res) => {
        const mappedPartners = res.data.map((user: any) => ({
          id: user.id,
          name: user.fullname,
          phone: user.phoneNumber,
          email: user.email,
          status: user.isApproved ? 'Đang hoạt động' : 'Tạm ngưng',
          photo: user.avatarUrl || 'https://via.placeholder.com/40',
          dob: user.dob,
        }));
        setPartners(mappedPartners);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);


  // Sử dụng trong hàm
  const handleOpenEdit = (mockPartners: PartnerType) => {
    setSelectedPartner(mockPartners);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedPartner(null);
  };

  const handleEditChange = (field: keyof PartnerType, value: string) => {
    setSelectedPartner((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleSaveEdit = () => {
    if (!selectedPartner) return;

    const updatedData = {
      fullname: selectedPartner.name,
      dob: selectedPartner.dob.includes("T") ? selectedPartner.dob : `${selectedPartner.dob}T00:00:00`, // đảm bảo định dạng ISO
      phoneNumber: selectedPartner.phone,
      avatarUrl: selectedPartner.photo,
    };

    const url = `/users/${selectedPartner.id}`;

    axios.put(url, updatedData)
      .then((res) => {
        console.log("Đã cập nhật:", res.data);

        setPartners((prev) =>
          prev.map((p) =>
            p.id === selectedPartner.id ? { ...p, ...selectedPartner } : p
          )
        );

        handleCloseEdit();
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật đối tác:", err);
      });
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
    if (!partnerToDelete) return;

    const url = `/users/${partnerToDelete.id}`;
    console.log("🗑️ Xoá đối tác với ID:", partnerToDelete.id);

    axios.delete(url)
      .then((res) => {
        console.log("Đã xoá thành công:", res.data);

        // Cập nhật lại danh sách sau khi xoá
        setPartners((prev) => prev.filter((p) => p.id !== partnerToDelete.id));

        setOpenDelete(false);
        setPartnerToDelete(null);
      })
      .catch((err) => {
        console.error("Lỗi khi xoá đối tác:", err);
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
                    <TableCell><strong>Tên đối tác</strong></TableCell>
                    <TableCell><strong>Ngày sinh</strong></TableCell>
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
                      <TableCell>
                        {mockPartners.dob.split('T')[0]}
                      </TableCell>
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
          <DialogTitle
            sx={{ backgroundColor: '#215858', color: 'white' }}
          >
            Chỉnh sửa đối tác
          </DialogTitle>
          <DialogContent
            sx={{ backgroundColor: '#faebce', minWidth: 400 }}
          >
            <TextField
              label="Tên đối tác"
              fullWidth
              margin="dense"
              value={selectedPartner.name}
              onChange={(e) => handleEditChange('name', e.target.value)}
            />
            <TextField
              label="Ngày sinh"
              type="date"
              fullWidth
              margin="dense"
              value={selectedPartner.dob.split('T')[0]} // chỉ lấy phần ngày
              onChange={(e) => handleEditChange('dob', e.target.value)} // vẫn là string dạng YYYY-MM-DD
              InputLabelProps={{ shrink: true }} // để nhãn không che giá trị
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              margin="dense"
              value={selectedPartner.phone}
              onChange={(e) => handleEditChange('phone', e.target.value)}
            />
            <TextField
              label="Link ảnh"
              fullWidth
              margin="dense"
              value={selectedPartner.photo}
              onChange={(e) => handleEditChange('photo', e.target.value)}
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