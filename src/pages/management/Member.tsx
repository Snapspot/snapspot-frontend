import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, TextField, Avatar, TablePagination, Dialog, Button,
    DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { useEffect } from 'react';
import axios from '../../utils/axiosInstance';


type Member = {
    id: string;
    email: string;
    fullname: string;
    dob: string;
    phoneNumber: string;
    avatarUrl: string;
    isApproved: boolean;
};


const Member = () => {

    const [openEdit, setOpenEdit] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        axios.get<Member[]>('/users/regular')
            .then((res) => {
                setMembers(res.data);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy danh sách thành viên:", err);
            });
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get<Member[]>('/users/regular');
            setMembers(response.data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách thành viên:', error);
        }
    };

    const handleOpenEdit = (member: Member) => {
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

    const handleSaveEdit = async () => {
        if (!memberToEdit) return;

        const updateBody = {
            fullname: memberToEdit.fullname,
            dob: memberToEdit.dob.includes('T') ? memberToEdit.dob : `${memberToEdit.dob}T00:00:00.000Z`,
            phoneNumber: memberToEdit.phoneNumber,
            avatarUrl: memberToEdit.avatarUrl,
        };

        try {
            await axios.put(`/users/${memberToEdit.id}`, updateBody);
            console.log('Cập nhật thành viên thành công:', updateBody);
            fetchMembers();
            setOpenEdit(false);
            setMemberToEdit(null);
        } catch (error) {
            console.error('Lỗi khi cập nhật thành viên:', error);
            alert("Cập nhật không thành công. Vui lòng thử lại.");
        }
    };

    const [openDelete, setOpenDelete] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

    const handleOpenDelete = (member: Member) => {
        setMemberToDelete(member);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setMemberToDelete(null);
    };

    const handleDeleteConfirmed = async () => {
        if (!memberToDelete) return;

        try {
            await axios.delete(`/users/${memberToDelete.id}`);
            console.log('Xoá thành viên thành công:', memberToDelete.id);

            // Cập nhật lại danh sách thành viên sau khi xoá
            setMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id));

            setOpenDelete(false);
            setMemberToDelete(null);
        } catch (error) {
            console.error('Lỗi khi xoá thành viên:', error);
            alert("Xoá không thành công. Vui lòng thử lại.");
        }
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

    const displayedRows = members
        .filter((m) =>
            m.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                                        <TableCell><strong>Tên thành viên</strong></TableCell>
                                        <TableCell><strong>Ngày sinh</strong></TableCell>
                                        <TableCell><strong>SĐT</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Trạng thái</strong></TableCell>
                                        <TableCell><strong>Thao tác</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedRows.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell><Avatar src={member.avatarUrl} alt={member.fullname} /></TableCell>
                                            <TableCell>{member.fullname}</TableCell>
                                            <TableCell>
                                                {member.dob.split('T')[0]}
                                            </TableCell>
                                            <TableCell>{member.phoneNumber}</TableCell>
                                            <TableCell>{member.email}</TableCell>
                                            <TableCell>{member.isApproved ? "Đang hoạt động" : "Tạm ngưng"}</TableCell>
                                            <TableCell>
                                                <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(member)}>
                                                    <FiEdit />
                                                </IconButton>
                                                <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(member)}>
                                                    <FiTrash2 />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={members.length}
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
                                <p>Bạn có chắc chắn muốn xoá thành viên <strong>{memberToDelete.fullname}</strong> không?</p>
                                <div style={{ textAlign: 'center', marginTop: 12 }}>
                                    <Avatar
                                        src={memberToDelete.avatarUrl}
                                        alt={memberToDelete.fullname}
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
                                    label="Tên thành viên"
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.fullname}
                                    onChange={(e) => handleEditChange('fullname', e.target.value)}
                                />
                                <TextField
                                    label="Ngày sinh"
                                    type="date"
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.dob?.split('T')[0]} // chỉ lấy phần yyyy-MM-dd
                                    onChange={(e) => handleEditChange('dob', e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="Số điện thoại"
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.phoneNumber}
                                    onChange={(e) => handleEditChange('phoneNumber', e.target.value)}
                                />
                                <TextField
                                    label="Link ảnh đại diện"
                                    fullWidth
                                    margin="dense"
                                    value={memberToEdit.avatarUrl}
                                    onChange={(e) => handleEditChange('avatar', e.target.value)}
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

                </div>
            </div>
        </div>
    );
};

export default Member;