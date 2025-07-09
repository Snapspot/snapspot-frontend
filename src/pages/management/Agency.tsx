import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, TextField, Avatar, TablePagination, Dialog, Button,
    DialogTitle, DialogContent, DialogActions,
    Snackbar
} from '@mui/material';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import MuiAlert from '@mui/material/Alert';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import axios from '../../utils/axiosInstance';


type Agency = {
    id: string;
    name: string;
    address: string;
    fullname: string;
    phoneNumber: string;
    avatarUrl: string;
    rating: number;
    companyName: string;
    companyId: string; // 👈 thêm dòng này
    spotName: string;
    spotId: string; // 👈 nếu cần
    description: string;
};


const Agency = () => {

    const [openEdit, setOpenEdit] = useState(false);
    const [agencyToEdit, setAgencyToEdit] = useState<Agency | null>(null);
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning',
    });

    const showSnackbar = (
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning' = 'success'
    ) => {
        setSnackbar({ open: true, message, severity });
    };

    // 🔁 Lấy danh sách agency khi load
    useEffect(() => {
        fetchAgencies();
    }, []);

    const fetchAgencies = async () => {
        setLoading(true); // ⏳ Bắt đầu loading
        try {
            const res = await axios.get('/agencies');
            if (res.data.success) {
                setAgencies(res.data.data);
            } else {
                console.error("API trả về không thành công:", res.data.message);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API /agencies:", err);
        } finally {
            setLoading(false); // ✅ Kết thúc loading
        }
    };



    // ✏️ Xử lý mở form edit
    const handleOpenEdit = (agency: Agency) => {
        setAgencyToEdit(agency);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setAgencyToEdit(null);
    };

    const handleEditChange = (field: keyof Agency, value: string) => {
        if (!agencyToEdit) return;
        setAgencyToEdit({ ...agencyToEdit, [field]: value });
    };

    const handleSaveEdit = async () => {
        if (!agencyToEdit) return;
        setSaving(true); // ⏳ Start saving

        const updateBody = {
            name: agencyToEdit.name,
            fullname: agencyToEdit.fullname,
            phoneNumber: agencyToEdit.phoneNumber,
            avatarUrl: agencyToEdit.avatarUrl,
            address: agencyToEdit.address,
            description: agencyToEdit.description,
            companyId: agencyToEdit.companyId,
            spotId: agencyToEdit.spotId,
        };

        try {
            const res = await axios.put(`/agencies/${agencyToEdit.id}`, updateBody);
            if (res.data.success) {
                fetchAgencies();
                setOpenEdit(false);
                setAgencyToEdit(null);
                showSnackbar('Cập nhật thành công!', 'success');
            } else {
                showSnackbar('Cập nhật thất bại: ' + res.data.message, 'error');
            }
        } catch (error: any) {
            console.error('❌ Lỗi cập nhật:', error);
            showSnackbar('Lỗi khi cập nhật', 'error');
        } finally {
            setSaving(false); // ✅ End saving
        }
    };

    // 🗑️ Xoá
    const [openDelete, setOpenDelete] = useState(false);
    const [agencyToDelete, setAgencyToDelete] = useState<Agency | null>(null);

    const handleOpenDelete = (agency: Agency) => {
        setAgencyToDelete(agency);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setAgencyToDelete(null);
    };

    const handleDeleteConfirmed = async () => {
        if (!agencyToDelete) return;
        setDeleting(true); // ⏳ Start deleting

        try {
            await axios.delete(`/agencies/${agencyToDelete.id}`);
            showSnackbar('Xoá thành công!', 'success');
            setAgencies((prev) => prev.filter((a) => a.id !== agencyToDelete.id));
            setOpenDelete(false);
            setAgencyToDelete(null);
        } catch (error) {
            console.error('Lỗi khi xoá agency:', error);
            showSnackbar('Xoá thất bại.', 'error');
        } finally {
            setDeleting(false); // ✅ End deleting
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

    const displayedRows = agencies
        .filter((a) =>
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.fullname.toLowerCase().includes(searchTerm.toLowerCase())
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
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress sx={{ color: '#215858' }} />
                            </div>
                        ) : (
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Ảnh</strong></TableCell>
                                            <TableCell><strong>Tên dịch vụ</strong></TableCell>
                                            <TableCell><strong>Địa chỉ</strong></TableCell>
                                            <TableCell><strong>Người phụ trách</strong></TableCell>
                                            <TableCell><strong>SĐT</strong></TableCell>
                                            <TableCell><strong>Công ty</strong></TableCell>
                                            <TableCell><strong>Địa điểm</strong></TableCell>
                                            <TableCell><strong>Thao tác</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {displayedRows.map((agency) => (
                                            <TableRow key={agency.id}>
                                                <TableCell>
                                                    <Avatar src={agency.avatarUrl} alt={agency.fullname} />
                                                </TableCell>
                                                <TableCell>{agency.name}</TableCell>
                                                <TableCell>{agency.address}</TableCell>
                                                <TableCell>{agency.fullname}</TableCell>
                                                <TableCell>{agency.phoneNumber}</TableCell>
                                                <TableCell>{agency.companyName}</TableCell>
                                                <TableCell>{agency.spotName}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleOpenEdit(agency)}>
                                                        <FiEdit />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleOpenDelete(agency)}>
                                                        <FiTrash2 />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={agencies.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage="Số dòng mỗi trang"
                                />
                            </TableContainer>
                        )}
                    </div>
                    {agencyToDelete && (
                        <Dialog open={openDelete} onClose={handleCloseDelete}>
                            <DialogTitle sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
                                Xác nhận xoá thành viên
                            </DialogTitle>
                            <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                                <p>Bạn có chắc chắn muốn xoá thành viên <strong>{agencyToDelete.fullname}</strong> không?</p>
                                <div style={{ textAlign: 'center', marginTop: 12 }}>
                                    <Avatar
                                        src={agencyToDelete.avatarUrl}
                                        alt={agencyToDelete.fullname}
                                        sx={{ width: 80, height: 80, margin: 'auto' }}
                                    />
                                </div>
                            </DialogContent>
                            <DialogActions sx={{ backgroundColor: '#faebce' }}>
                                <Button
                                    onClick={handleDeleteConfirmed}
                                    variant="contained"
                                    sx={{ backgroundColor: '#7a1e1e', color: 'white' }}
                                    disabled={deleting}
                                >
                                    {deleting ? 'Đang xoá...' : 'Xoá'}
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
                    {agencyToEdit && (
                        <Dialog open={openEdit} onClose={handleCloseEdit}>
                            <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
                                Chỉnh sửa đối tác
                            </DialogTitle>
                            <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                                <TextField
                                    label="Tên gói dịch vụ / agency"
                                    fullWidth
                                    margin="dense"
                                    value={agencyToEdit.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                />
                                <TextField
                                    label="Họ và tên người đại diện"
                                    fullWidth
                                    margin="dense"
                                    value={agencyToEdit.fullname}
                                    onChange={(e) => handleEditChange('fullname', e.target.value)}
                                />
                                <TextField
                                    label="Số điện thoại"
                                    fullWidth
                                    margin="dense"
                                    value={agencyToEdit.phoneNumber}
                                    onChange={(e) => handleEditChange('phoneNumber', e.target.value)}
                                />
                                <TextField
                                    label="Địa chỉ"
                                    fullWidth
                                    margin="dense"
                                    value={agencyToEdit.address}
                                    onChange={(e) => handleEditChange('address', e.target.value)}
                                />
                                <TextField
                                    label="Link ảnh đại diện"
                                    fullWidth
                                    margin="dense"
                                    value={agencyToEdit.avatarUrl}
                                    onChange={(e) => handleEditChange('avatarUrl', e.target.value)}
                                />
                                <TextField
                                    label="Mô tả dịch vụ"
                                    fullWidth
                                    margin="dense"
                                    multiline
                                    rows={3}
                                    value={agencyToEdit.description}
                                    onChange={(e) => handleEditChange('description', e.target.value)}
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
                                    sx={{ backgroundColor: '#215858', color: 'white' }}
                                    disabled={saving}
                                >
                                    {saving ? 'Đang lưu...' : 'Lưu'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    elevation={6}
                    variant="filled" // 👈 Cho màu nền tương ứng severity
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Agency;