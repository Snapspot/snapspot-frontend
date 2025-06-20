import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Select, MenuItem
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState, type SetStateAction, useEffect } from 'react';
import axios from '../../utils/axiosInstance';

type DistrictType = {
    id: string;
    name: string;
    description: string;
    provinceId: string;
    provinceName?: string; // optional, chỉ dùng để hiển thị
    isDeleted: boolean;
};


const District = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [districts, setDistricts] = useState<DistrictType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictType | null>(null);
    const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        fetchDistricts();
        fetchProvinces();
    }, []);

    const fetchDistricts = async () => {
        try {
            const response = await axios.get('http://14.225.217.24:8080/api/Districts');
            console.log("🔍 API Districts trả về:", response.data);
            const mapped = response.data.map((d: any) => ({
                id: d.id,
                name: d.name,
                description: d.description,
                provinceId: d.provinceId, // 🟢 thêm dòng này
                provinceName: d.provinceName,
                isDeleted: d.isDeleted,
            }));
            setDistricts(mapped);
        } catch (error) {
            console.error('Lỗi khi gọi GET /api/Districts:', error);
        }
    };

    const fetchProvinces = async () => {
        try {
            const response = await axios.get('http://14.225.217.24:8080/api/Provinces');
            setProvinces(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tỉnh:', error);
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenEdit = (district: DistrictType = {
        id: '',
        name: '',
        description: '',
        provinceId: '',
        provinceName: '',
        isDeleted: false
    }) => {
        console.log("Đang mở form edit với:", district);
        setSelectedDistrict(district);
        setOpenEdit(true);
    };


    const handleOpenDelete = (district: SetStateAction<DistrictType | null>) => {
        setSelectedDistrict(district);
        setOpenDelete(true);
    };

    const handleSaveEdit = async () => {
        if (!selectedDistrict) return;

        const payload = {
            name: selectedDistrict.name,
            description: selectedDistrict.description,
            provinceId: selectedDistrict.provinceId
        };

        try {
            if (selectedDistrict.id !== '') {
                await axios.put(
                    `http://14.225.217.24:8080/api/Districts/${selectedDistrict.id}`,
                    payload
                );
            } else {
                await axios.post('http://14.225.217.24:8080/api/Districts', payload);
            }

            // Đảm bảo gọi sau khi PUT/POST hoàn tất
            await fetchDistricts();
            setOpenEdit(false);
        } catch (error) {
            console.error('Lỗi khi lưu District:', error);
        }
    };


    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`http://14.225.217.24:8080/api/Districts/${selectedDistrict?.id}`);

            // Load lại danh sách huyện sau khi xoá
            await fetchDistricts();

            // Đóng dialog xoá
            setOpenDelete(false);
        } catch (error) {
            console.error('Lỗi khi xoá District:', error);
        }
    };


    const filteredRows = districts.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.provinceName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <div className="flex-1 relative flex flex-col overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale brightness-80 opacity-150"
                    style={{
                        backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>
                <div className="relative flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
                        <h1 className="text-center flex items-center justify-center h-[50px]"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '40px',
                                lineHeight: '100%',
                                letterSpacing: '0.1em',
                                color: '#215b5b',
                            }}
                        >
                            Danh sách Huyện / Thị xã
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
                                                <TableCell>{district.provinceName}</TableCell>
                                                <TableCell>{district.isDeleted ? 'Ngừng hoạt động' : 'Hoạt động'}</TableCell>
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
                        <Select
                            fullWidth
                            value={selectedDistrict?.provinceId || ''} // đảm bảo có value
                            onChange={(e) =>
                                setSelectedDistrict({ ...selectedDistrict!, provinceId: e.target.value })
                            }
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Chọn tỉnh</MenuItem>
                            {provinces.map((prov) => (
                                <MenuItem key={prov.id} value={prov.id}>
                                    {prov.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            fullWidth
                            value={selectedDistrict.isDeleted ? 'true' : 'false'}
                            onChange={(e) =>
                                setSelectedDistrict({
                                    ...selectedDistrict,
                                    isDeleted: e.target.value === 'true',
                                })
                            }
                        >
                            <MenuItem value="false">Hoạt động</MenuItem>
                            <MenuItem value="true">Ngừng hoạt động</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#faebce' }}>
                        <Button onClick={() => setOpenEdit(false)} variant="outlined" sx={{ color: '#215858', borderColor: '#215858' }}>
                            Hủy
                        </Button>
                        <Button onClick={handleSaveEdit} variant="contained" sx={{ backgroundColor: '#215858', color: 'white' }}>
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
                        <Button onClick={handleDeleteConfirmed} variant="contained" sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
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
