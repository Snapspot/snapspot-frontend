import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState, type SetStateAction } from 'react';

type DistrictType = {
    id: number;
    name: string;
    description: string;
    province: string;
    status: string;
};

const mockDistricts = [
    { id: 1, name: 'Ba Đình', description: 'Quận trung tâm Hà Nội', province: 'Hà Nội', status: 'Hoạt động' },
    { id: 2, name: 'Thủ Đức', description: 'Thành phố trực thuộc TP.HCM', province: 'TP. Hồ Chí Minh', status: 'Hoạt động' },
    { id: 3, name: 'Châu Thành', description: 'Huyện của tỉnh Tiền Giang', province: 'Tiền Giang', status: 'Ngừng hoạt động' },
    { id: 4, name: 'Tân Phú', description: 'Quận ở phía Tây TP.HCM', province: 'TP. Hồ Chí Minh', status: 'Hoạt động' },
    { id: 5, name: 'Ninh Kiều', description: 'Quận trung tâm Cần Thơ', province: 'Cần Thơ', status: 'Hoạt động' },
    { id: 6, name: 'Long Xuyên', description: 'TP thuộc tỉnh An Giang', province: 'An Giang', status: 'Ngừng hoạt động' },
];

const District = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [districts, setDistricts] = useState<DistrictType[]>(mockDistricts);
    const [searchTerm, setSearchTerm] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictType | null>(null);

    const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleOpenEdit = (district: DistrictType = { id: 0, name: '', description: '', province: '', status: '' }) => {
        setSelectedDistrict(district);
        setOpenEdit(true);
    };


    const handleOpenDelete = (district: SetStateAction<DistrictType | null>) => {
        setSelectedDistrict(district);
        setOpenDelete(true);
    };

    const handleSaveEdit = () => {
        if (selectedDistrict?.id && selectedDistrict.id !== 0) {
            setDistricts((prev) =>
                prev.map((d) => (d.id === selectedDistrict.id ? selectedDistrict : d))
            );
        } else if (selectedDistrict) {
            const newId = Math.max(...districts.map(d => d.id)) + 1;
            setDistricts([...districts, { ...selectedDistrict, id: newId }]);
        }
        setOpenEdit(false);
    };



    const handleDeleteConfirmed = () => {
        setDistricts((prev) => prev.filter((d) => d.id !== selectedDistrict?.id));
        setOpenDelete(false);
    };

    const displayedRows = districts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <div className="flex-1 relative flex flex-col overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center filter grayscale brightness-125 opacity-40"
                    style={{
                        backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')"
                    }}
                ></div>
                <div className="absolute inset-0 bg-[rgba(130,90,50,0.15)]"></div>
                <div className="relative flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
                        <h1 className="text-3xl font-bold mb-4">Danh sách Huyện/Thị xã</h1>
                        <div style={{ padding: '24px' }}>
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
                                    onClick={() => handleOpenEdit()}
                                    sx={{ backgroundColor: '#215858', color: 'white', '&:hover': { backgroundColor: '#1a4646' } }}
                                >
                                    Thêm Huyện / Thị xã
                                </Button>
                            </div>

                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Huyện / Thị xã</strong></TableCell>
                                            <TableCell><strong>Mô tả</strong></TableCell>
                                            <TableCell><strong>Thuộc tỉnh</strong></TableCell>
                                            <TableCell><strong>Trạng thái</strong></TableCell>
                                            <TableCell><strong>Thao tác</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedRows.map((district) => (
                                            <TableRow key={district.id}>
                                                <TableCell>{district.name}</TableCell>
                                                <TableCell>{district.description}</TableCell>
                                                <TableCell>{district.province}</TableCell>
                                                <TableCell>{district.status}</TableCell>
                                                <TableCell>
                                                    <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenEdit(district)}>
                                                        <FiEdit />
                                                    </IconButton>
                                                    <IconButton sx={{ color: '#215858' }} onClick={() => handleOpenDelete(district)}>
                                                        <FiTrash2 />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={districts.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage="Số dòng mỗi trang"
                                />
                            </TableContainer>
                        </div>
                    </main>
                </div>
            </div>

            {/* Popup Sửa */}
            {selectedDistrict && openEdit && (
                <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                    <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
                        {selectedDistrict?.id ? 'Chỉnh sửa Huyện / Thị xã' : 'Thêm Huyện / Thị xã'}
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                        <TextField
                            label="Tên"
                            fullWidth
                            margin="dense"
                            value={selectedDistrict.name}
                            onChange={(e) => setSelectedDistrict({ ...selectedDistrict, name: e.target.value })}
                        />
                        <TextField
                            label="Mô tả"
                            fullWidth
                            margin="dense"
                            value={selectedDistrict.description}
                            onChange={(e) => setSelectedDistrict({ ...selectedDistrict, description: e.target.value })}
                        />
                        <TextField
                            label="Thuộc tỉnh"
                            fullWidth
                            margin="dense"
                            value={selectedDistrict.province}
                            onChange={(e) => setSelectedDistrict({ ...selectedDistrict, province: e.target.value })}
                        />
                        <TextField
                            label="Trạng thái"
                            fullWidth
                            margin="dense"
                            value={selectedDistrict.status}
                            onChange={(e) => setSelectedDistrict({ ...selectedDistrict, status: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#faebce' }}>
                        <Button onClick={() => setOpenEdit(false)} variant="outlined" sx={{ color: '#215858', borderColor: '#215858' }}>
                            Hủy
                        </Button>
                        <Button onClick={handleSaveEdit} variant="contained" sx={{ backgroundColor: '#215858', color: 'white', '&:hover': { backgroundColor: '#1a4646' } }}>
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Popup Xóa */}
            {selectedDistrict && openDelete && (
                <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                    <DialogTitle sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
                        Xác nhận xoá Huyện / Thị xã
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                        <p>Bạn có chắc chắn muốn xoá <strong>{selectedDistrict.name}</strong> không?</p>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#faebce' }}>
                        <Button onClick={handleDeleteConfirmed} variant="contained" sx={{ backgroundColor: '#7a1e1e', color: 'white', '&:hover': { backgroundColor: '#5c1515' } }}>
                            Xoá
                        </Button>
                        <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ color: '#7a1e1e', borderColor: '#7a1e1e' }}>
                            Huỷ
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default District;
