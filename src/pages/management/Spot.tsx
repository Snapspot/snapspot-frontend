import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
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
    Button,
    Select,
    MenuItem
} from '@mui/material';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../utils/axiosInstance';

type SpotType = {
    id?: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    districtId: string;
    districtName?: string;
    provinceName?: string;
    agencies?: any[];
    createdAt?: string;
    updatedAt?: string;
    isDeleted?: boolean;
    address?: string;
    imageUrl?: string;
};



const Spot = () => {
    const [spotList, setSpotList] = useState<any[]>([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState<SpotType | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);


    const handleDeleteConfirmed = async () => {
        if (!selectedSpot?.id) return;

        try {
            // Gọi API DELETE
            await axios.delete(`/spots/${selectedSpot.id}`);
            console.log('Deleted spot:', selectedSpot.id);

            // Sau khi xoá, làm mới danh sách
            const res = await axios.get('/spots');
            setSpotList(res.data.data);
        } catch (error) {
            console.error('Lỗi khi xoá địa điểm:', error);
        } finally {
            setOpenDelete(false);
            setSelectedSpot(null);
        }
    };

    useEffect(() => {
        const fetchSpots = axios.get('/spots');
        const fetchDistricts = axios.get('/districts');

        Promise.all([fetchSpots, fetchDistricts])
            .then(([spotsRes, districtsRes]) => {
                setSpotList(spotsRes.data.data);
                const mappedDistricts = districtsRes.data.map((d: any) => ({
                    id: d.id,
                    name: d.name,
                }));
                setDistricts(mappedDistricts);
            })
            .catch((err) => {
                console.error('Lỗi khi lấy dữ liệu:', err);
            });
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRows = spotList.filter((spot) =>
        spot.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleSaveSpot = async () => {
        if (!selectedSpot) return;

        try {
            if (selectedSpot.id) {
                // PUT - Cập nhật
                await axios.put(`/spots/${selectedSpot.id}`, selectedSpot);
                console.log('Đã cập nhật:', selectedSpot.id);
            } else {
                // POST - Thêm mới
                const spotToCreate = {
                    name: selectedSpot.name,
                    description: selectedSpot.description,
                    latitude: selectedSpot.latitude,
                    longitude: selectedSpot.longitude,
                    districtId: selectedSpot.districtId,
                };

                console.log('Gửi dữ liệu POST:', spotToCreate);
                await axios.post('/spots', spotToCreate);
                console.log('Đã thêm mới địa điểm');
            }

            const res = await axios.get('/spots');
            setSpotList(res.data.data);
        } catch (error) {
            console.error('Lỗi khi lưu địa điểm:', error);
        } finally {
            setOpenEdit(false);
            setSelectedSpot(null);
        }
    };

    return (
        <div className="flex min-h-screen w-screen">
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
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#215858' }}
                                    onClick={() => {
                                        setSelectedSpot({
                                            name: '',
                                            description: '',
                                            latitude: 0,
                                            longitude: 0,
                                            districtId: ''
                                        });
                                        setOpenEdit(true);
                                    }}
                                >
                                    THÊM ĐỊA ĐIỂM
                                </Button>
                            </div>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Tên địa điểm</strong></TableCell>
                                            <TableCell style={{ width: '200px' }}><strong>Mô tả</strong></TableCell>
                                            <TableCell><strong>Vị trí</strong></TableCell>
                                            <TableCell><strong>Vĩ độ</strong></TableCell>
                                            <TableCell><strong>Kinh độ</strong></TableCell>
                                            <TableCell><strong>Địa chỉ</strong></TableCell>
                                            <TableCell><strong>Ảnh</strong></TableCell>
                                            <TableCell><strong>Trạng thái</strong></TableCell>
                                            <TableCell><strong>Thao tác</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedRows.map((spot) => (
                                            <TableRow key={spot.id}>
                                                <TableCell>{spot.name}</TableCell>
                                                <TableCell>{spot.description}</TableCell>
                                                <TableCell>{`${spot.districtName}, ${spot.provinceName}`}</TableCell>
                                                <TableCell>{spot.latitude}</TableCell>
                                                <TableCell>{spot.longitude}</TableCell>
                                                <TableCell>{spot.address}</TableCell>
                                                <TableCell>
                                                    {spot.imageUrl && (
                                                        <img
                                                            src={spot.imageUrl}
                                                            alt={spot.name}
                                                            style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 8 }}
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell>{spot.isDeleted ? 'Ngừng hoạt động' : 'Hoạt động'}</TableCell>
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
                                    count={filteredRows.length}
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
                        onChange={(e) =>
                            setSelectedSpot((prev) => ({ ...prev!, name: e.target.value }))
                        }
                    />
                    <TextField
                        label="Mô tả"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.description || ''}
                        onChange={(e) =>
                            setSelectedSpot((prev) => ({ ...prev!, description: e.target.value }))
                        }
                    />
                    <TextField
                        label="Vĩ độ (Latitude)"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.latitude || 0}
                        onChange={(e) =>
                            setSelectedSpot((prev) => ({
                                ...prev!,
                                latitude: Number(e.target.value),
                            }))
                        }
                    />
                    <TextField
                        label="Kinh độ (Longitude)"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={selectedSpot?.longitude || 0}
                        onChange={(e) =>
                            setSelectedSpot((prev) => ({
                                ...prev!,
                                longitude: Number(e.target.value),
                            }))
                        }
                    />
                    <Select
                        fullWidth
                        displayEmpty
                        value={selectedSpot?.districtId || ''}
                        onChange={(e) =>
                            setSelectedSpot((prev) => ({ ...prev!, districtId: e.target.value }))
                        }
                        margin="dense"
                    >
                        <MenuItem value="" disabled>Chọn huyện / thị xã</MenuItem>
                        {districts.map((d) => (
                            <MenuItem key={d.id} value={d.id}>
                                {d.name}
                            </MenuItem>
                        ))}
                    </Select>
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
                        onClick={handleSaveSpot}
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