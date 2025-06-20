import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, TextField, Avatar, TablePagination, Dialog, Button,
    DialogTitle, DialogContent, DialogActions, MenuItem
} from '@mui/material';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';

const mockMembers = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'a.nguyen@mail.com',
        role: 'Admin',
        avatar: 'https://i.pravatar.cc/40?img=3',
    },
    {
        id: 2,
        name: 'Trần Thị B',
        email: 'b.tran@mail.com',
        role: 'User',
        avatar: 'https://i.pravatar.cc/40?img=4',
    },
];

const Member = () => {

    const [openEdit, setOpenEdit] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState<typeof mockMembers[0] | null>(null);

    const handleOpenEdit = (member: typeof mockMembers[0]) => {
        setMemberToEdit(member);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setMemberToEdit(null);
    };

    const handleEditChange = (field: string, value: string) => {
        if (!memberToEdit) return;
        setMemberToEdit({ ...memberToEdit, [field]: value });
    };

    const handleSaveEdit = () => {
        console.log('Cập nhật thành viên:', memberToEdit);
        setOpenEdit(false);
        setMemberToEdit(null);
    };


    const [openDelete, setOpenDelete] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<typeof mockMembers[0] | null>(null);

    const handleOpenDelete = (member: typeof mockMembers[0]) => {
        setMemberToDelete(member);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setMemberToDelete(null);
    };

    const handleDeleteConfirmed = () => {
        console.log('Xóa thành viên:', memberToDelete);
        setOpenDelete(false);
        setMemberToDelete(null);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Số dòng mỗi trang

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const displayedRows = mockMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                            Thành viên
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
                                        <TableCell><strong>Họ tên</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Vai trò</strong></TableCell>
                                        <TableCell><strong>Thao tác</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedRows.map((mockMembers) => (
                                        <TableRow key={mockMembers.id}>
                                            <TableCell><Avatar src={mockMembers.avatar} alt={mockMembers.name} /></TableCell>
                                            <TableCell>{mockMembers.name}</TableCell>
                                            <TableCell>{mockMembers.email}</TableCell>
                                            <TableCell>{mockMembers.role}</TableCell>
                                            <TableCell>
                                                <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(mockMembers)}>
                                                    <FiEdit />
                                                </IconButton>
                                                <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(mockMembers)}>
                                                    <FiTrash2 />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={mockMembers.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Số dòng mỗi trang"
                            />
                        </TableContainer>
                    </div>
                    {memberToDelete && (
                        <Dialog open={openDelete} onClose={handleCloseDelete}>
                            <DialogTitle sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
                                Xác nhận xoá thành viên
                            </DialogTitle>
                            <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                                <p>Bạn có chắc chắn muốn xoá thành viên <strong>{memberToDelete.name}</strong> không?</p>
                                <div style={{ textAlign: 'center', marginTop: 12 }}>
                                    <Avatar
                                        src={memberToDelete.avatar}
                                        alt={memberToDelete.name}
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
                    {memberToEdit && (
                        <Dialog open={openEdit} onClose={handleCloseEdit}>
                            <DialogTitle
                                sx={{ backgroundColor: '#215858', color: 'white' }}
                            >
                                Chỉnh sửa thành viên
                            </DialogTitle>
                            <DialogContent
                                sx={{ backgroundColor: '#faebce', minWidth: 400 }}
                            >
                                <TextField
                                    label="Link ảnh đại diện"
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.avatar}
                                    onChange={(e) => handleEditChange('avatar', e.target.value)}
                                />
                                <TextField
                                    label="Họ tên"
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                />
                                <TextField
                                    label="Email"
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.email}
                                    onChange={(e) => handleEditChange('email', e.target.value)}
                                />
                                <TextField
                                    label="Vai trò"
                                    select
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.role}
                                    onChange={(e) => handleEditChange('role', e.target.value)}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="User">User</MenuItem>
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

                </div>
            </div>
        </div>
    );
};

export default Member;
