import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

type SpotType = {
    id: number;
    name: string;
    description: string;
    location: string;
    branchCount: number;
    status: string;
};


const mockSpots = [
    {
        id: 1,
        name: 'Bến Nhà Rồng',
        description: 'Một địa điểm du lịch nổi tiếng tại TP.HCM',
        location: 'Quận 4, TP.HCM',
        branchCount: 3,
        status: 'Hoạt động',
    },
    {
        id: 2,
        name: 'Hồ Gươm',
        description: 'Biểu tượng văn hóa tại Hà Nội',
        location: 'Hoàn Kiếm, Hà Nội',
        branchCount: 5,
        status: 'Hoạt động',
    },
    {
        id: 3,
        name: 'Chùa Thiên Mụ',
        description: 'Ngôi chùa nổi tiếng ở Huế',
        location: 'TP. Huế, Thừa Thiên Huế',
        branchCount: 1,
        status: 'Ngừng hoạt động',
    },
];

const Spot = () => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState<SpotType | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const handleDeleteConfirmed = () => {
        if (!selectedSpot?.id) return;

        // TODO: Gọi API xoá hoặc logic xoá tại đây
        console.log('Deleting spot with ID:', selectedSpot.id);

        // Sau khi xoá xong (hoặc giả lập xoá thành công)
        setOpenDelete(false);
        setSelectedSpot(null);

        // Nếu cần reload danh sách sau khi xoá
        // fetchSpots(); // ví dụ: gọi lại API lấy danh sách
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

    const displayedRows = mockSpots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                            Danh sách địa điểm
                        </h1>
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
                                    setSelectedSpot({ name: '', description: '', location: '', branchCount: 0, status: '', id: 0 });
                                    setOpenEdit(true);
                                }}>
                                    THÊM ĐỊA ĐIỂM
                                </Button>
                            </div>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Tên địa điểm</strong></TableCell>
                                            <TableCell><strong>Mô tả</strong></TableCell>
                                            <TableCell><strong>Vị trí</strong></TableCell>
                                            <TableCell><strong>Số lượng chi nhánh</strong></TableCell>
                                            <TableCell><strong>Trạng thái</strong></TableCell>
                                            <TableCell><strong>Thao tác</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedRows.map((spot) => (
                                            <TableRow key={spot.id}>
                                                <TableCell>{spot.name}</TableCell>
                                                <TableCell>{spot.description}</TableCell>
                                                <TableCell>{spot.location}</TableCell>
                                                <TableCell>{spot.branchCount}</TableCell>
                                                <TableCell>{spot.status}</TableCell>
                                                <TableCell>
                                                    <IconButton sx={{ color: '#215858' }}>
                                                        <FiEye />
                                                    </IconButton>
                                                    <IconButton sx={{ color: '#215858' }} onClick={() => {
                                                        setSelectedSpot(spot);
                                                        setOpenEdit(true);
                                                    }}>
                                                        <FiEdit />
                                                    </IconButton>
                                                    <IconButton sx={{ color: '#215858' }} onClick={() => {
                                                        setSelectedSpot(spot);
                                                        setOpenDelete(true);
                                                    }}>
                                                        <FiTrash2 />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={mockSpots.length}
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
                    {selectedSpot?.id ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm'}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                    <TextField
                        label="Tên địa điểm"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.name || ''}
                    // onChange={(e) => setSelectedSpot({ ...selectedSpot, name: e.target.value })}
                    />
                    <TextField
                        label="Mô tả"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.description || ''}
                    // onChange={(e) => setSelectedSpot({ ...selectedSpot, description: e.target.value })}
                    />
                    <TextField
                        label="Vị trí"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.status || ''}
                    // onChange={(e) => setSelectedSpot({ ...selectedSpot, status: e.target.value })}
                    />
                    <TextField
                        label="Số lượng chi nhánh"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.status || ''}
                    // onChange={(e) => setSelectedSpot({ ...selectedSpot, status: e.target.value })}
                    />
                    <TextField
                        label="Trạng thái"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.status || ''}
                    // onChange={(e) => setSelectedSpot({ ...selectedSpot, status: e.target.value })}
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
                            // TODO: Lưu chỉnh sửa hoặc thêm Spot
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
                    Xác nhận xoá Huyện / Thị xã
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#faebce', minWidth: 400 }}>
                    <p>Bạn có chắc chắn muốn xoá <strong>{selectedSpot?.name}</strong> không?</p>
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
                        onClick={() => setOpenDelete(false)}
                        variant="outlined"
                        sx={{ color: '#7a1e1e', borderColor: '#7a1e1e' }}
                    >
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)}>
                <DialogTitle>Thêm địa điểm mới</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Tên" margin="dense" />
                    <TextField fullWidth label="Mô tả" margin="dense" />
                    <TextField fullWidth label="Vị trí" margin="dense" />
                    <TextField fullWidth label="Số chi nhánh" type="number" margin="dense" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddOpen(false)}>Hủy</Button>
                    <Button variant="contained" onClick={() => setIsAddOpen(false)}>Thêm</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Spot;
