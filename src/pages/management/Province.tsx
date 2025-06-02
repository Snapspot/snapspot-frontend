import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField
} from '@mui/material';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const mockProvinces = [
    {
        id: 1,
        name: 'Hà Nội',
        description: 'Thủ đô Việt Nam',
        status: 'Hoạt động',
    },
    {
        id: 2,
        name: 'TP. Hồ Chí Minh',
        description: 'Thành phố lớn nhất',
        status: 'Ngừng hoạt động',
    },
];

const Province = () => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState<any>(null);
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
    const displayedRows = mockProvinces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                    <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
                        <h1 className="text-3xl font-bold mb-4">Danh sách tỉnh</h1>
                        <div style={{ padding: '24px' }}>
                            <div className="flex justify-between items-center mb-4">
                                <TextField
                                    label="Tìm kiếm"
                                    variant="outlined"
                                    size="small"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button variant="contained" sx={{ backgroundColor: '#215858' }} onClick={() => {
                                    setSelectedProvince({ name: '', description: '', status: '' });
                                    setOpenEdit(true);
                                }}>
                                    Thêm tỉnh
                                </Button>
                            </div>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Tỉnh</strong></TableCell>
                                            <TableCell><strong>Mô tả</strong></TableCell>
                                            <TableCell><strong>Trạng thái</strong></TableCell>
                                            <TableCell><strong>Thao tác</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedRows.map((province) => (
                                            <TableRow key={province.id}>
                                                <TableCell>{province.name}</TableCell>
                                                <TableCell>{province.description}</TableCell>
                                                <TableCell>{province.status}</TableCell>
                                                <TableCell>
                                                    <IconButton sx={{ color: '#215858' }}>
                                                        <FiEye />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{ color: '#215858' }}
                                                        onClick={() => {
                                                            setSelectedProvince(province);
                                                            setOpenEdit(true);
                                                        }}
                                                    >
                                                        <FiEdit />
                                                    </IconButton>

                                                    <IconButton
                                                        sx={{ color: '#215858' }}
                                                        onClick={() => {
                                                            setSelectedProvince(province);
                                                            setOpenDelete(true);
                                                        }}
                                                    >
                                                        <FiTrash2 />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={mockProvinces.length}
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
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
                    {selectedProvince?.id ? 'Chỉnh sửa tỉnh' : 'Thêm tỉnh'}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                    <TextField
                        label="Tên tỉnh"
                        fullWidth
                        margin="dense"
                        value={selectedProvince?.name || ''}
                        onChange={(e) => setSelectedProvince({ ...selectedProvince, name: e.target.value })}
                    />
                    <TextField
                        label="Mô tả"
                        fullWidth
                        margin="dense"
                        value={selectedProvince?.description || ''}
                        onChange={(e) => setSelectedProvince({ ...selectedProvince, description: e.target.value })}
                    />
                    <TextField
                        label="Trạng thái"
                        fullWidth
                        margin="dense"
                        value={selectedProvince?.status || ''}
                        onChange={(e) => setSelectedProvince({ ...selectedProvince, status: e.target.value })}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#faebce' }}>
                    <Button
                        onClick={() => setOpenEdit(false)}
                        variant="outlined"
                        sx={{ color: '#215858', borderColor: '#215858' }}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() => {
                            // TODO: Lưu chỉnh sửa hoặc thêm
                            setOpenEdit(false);
                        }}
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

            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
                    Xác nhận xoá tỉnh
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                    <p>
                        Bạn có chắc chắn muốn xoá tỉnh <strong>{selectedProvince?.name}</strong> không?
                    </p>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#faebce' }}>
                    <Button
                        onClick={() => {
                            // TODO: Xử lý xoá
                            setOpenDelete(false);
                        }}
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
                        onClick={() => setOpenDelete(false)}
                        variant="outlined"
                        sx={{ color: '#7a1e1e', borderColor: '#7a1e1e' }}
                    >
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Province;
