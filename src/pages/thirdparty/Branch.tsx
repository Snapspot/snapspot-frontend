import Sidebar from '../../components/thirdparty/Sidebar';
import Navbar from '../../components/thirdparty/Navbar';
import {
    Table, TableBody, TableCell, TableContainer, TablePagination,
    TableHead, TableRow, Paper, IconButton, Button, TextField, Dialog,
    DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Star, StarBorder } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { v4 as uuidv4 } from 'uuid';

const BranchManagement = () => {
    const [agencyList, setAgencyList] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Dialog state
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newAgency, setNewAgency] = useState({
        name: '',
        address: '',
        fullname: '',
        phoneNumber: '',
        avatarUrl: '',
        spotId: '',
        description: '',
        agencyServiceIds: [] as string[]
    });

    useEffect(() => {
        fetchAgencies();
    }, []);

    const fetchAgencies = () => {
        axios.get('/third-party/agencies')
            .then((res) => {
                setAgencyList(res.data.data || []);
            })
            .catch((err) => {
                console.error('Lỗi khi lấy danh sách agency:', err);
            });
    };

    const filteredRows = agencyList.filter(agency =>
        agency.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<Star key={i} sx={{ color: '#f5a623', fontSize: 20 }} />);
            } else {
                stars.push(<StarBorder key={i} sx={{ color: '#f5a623', fontSize: 20 }} />);
            }
        }
        return stars;
    };

    // Handle input change in dialog
    const handleChange = (field: string, value: string | string[]) => {
        setNewAgency(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Submit new agency
    const handleAddAgency = () => {
    const spotId = uuidv4(); // Tự sinh UUID ngẫu nhiên
    axios.post('/agencies', {
        createAgencyDto: {
            ...newAgency,
            spotId
        }
    })
    .then(() => {
        setOpenAddDialog(false);
        setNewAgency({
            name: '',
            address: '',
            fullname: '',
            phoneNumber: '',
            avatarUrl: '',
            spotId: '',
            description: '',
            agencyServiceIds: []
        });
        fetchAgencies();
    })
    .catch(err => {
        if (err.response) {
            console.error("📌 API trả lỗi:", err.response.data);
        } else if (err.request) {
            console.error("📌 Không nhận được phản hồi từ server:", err.request);
        } else {
            console.error("📌 Lỗi khi setup request:", err.message);
        }
    });
};


    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <div className="flex-1 relative flex flex-col overflow-hidden">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale brightness-80 opacity-150"
                    style={{
                        backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>

                {/* Content */}
                <div className="relative flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
                        <h1 className="text-center flex items-center justify-center h-[50px]"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '40px',
                                letterSpacing: '0.1em',
                                color: '#215b5b',
                            }}>
                            Quản lý chi nhánh
                        </h1>

                        <div style={{ padding: '24px' }}>
                            {/* Search + Add button */}
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
                                    onClick={() => setOpenAddDialog(true)}
                                >
                                    Thêm chi nhánh
                                </Button>
                            </div>

                            {/* Table */}
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Tên dịch vụ</strong></TableCell>
                                            <TableCell><strong>Người phụ trách</strong></TableCell>
                                            <TableCell><strong>SĐT</strong></TableCell>
                                            <TableCell><strong>Địa chỉ</strong></TableCell>
                                            <TableCell><strong>Công ty</strong></TableCell>
                                            <TableCell><strong>Địa điểm</strong></TableCell>
                                            <TableCell><strong>Đánh giá</strong></TableCell>
                                            <TableCell><strong>Thao tác</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedRows.map((agency) => (
                                            <TableRow key={agency.id}>
                                                <TableCell>{agency.name}</TableCell>
                                                <TableCell>{agency.fullname}</TableCell>
                                                <TableCell>{agency.phoneNumber}</TableCell>
                                                <TableCell>{agency.address}</TableCell>
                                                <TableCell>{agency.companyName}</TableCell>
                                                <TableCell>{agency.spotName}</TableCell>
                                                <TableCell>
                                                    {renderStars(agency.rating)}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton sx={{ color: '#215858' }}>
                                                        <FiEye />
                                                    </IconButton>
                                                    <IconButton sx={{ color: '#215858' }}>
                                                        <FiEdit />
                                                    </IconButton>
                                                    <IconButton sx={{ color: '#215858' }}>
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
                                    onPageChange={(_e, newPage) => setPage(newPage)}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={(e) => {
                                        setRowsPerPage(parseInt(e.target.value, 10));
                                        setPage(0);
                                    }}
                                    labelRowsPerPage="Số dòng mỗi trang"
                                />
                            </TableContainer>
                        </div>
                    </main>
                </div>
            </div>

            {/* Add Agency Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Thêm chi nhánh</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField label="Tên dịch vụ" value={newAgency.name} onChange={(e) => handleChange('name', e.target.value)} />
                    <TextField label="Người phụ trách" value={newAgency.fullname} onChange={(e) => handleChange('fullname', e.target.value)} />
                    <TextField label="Số điện thoại" value={newAgency.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} />
                    <TextField label="Địa chỉ" value={newAgency.address} onChange={(e) => handleChange('address', e.target.value)} />
                    <TextField label="Avatar URL" value={newAgency.avatarUrl} onChange={(e) => handleChange('avatarUrl', e.target.value)} />
                    <TextField label="Spot ID" value={newAgency.spotId} onChange={(e) => handleChange('spotId', e.target.value)} />
                    <TextField label="Mô tả" multiline rows={3} value={newAgency.description} onChange={(e) => handleChange('description', e.target.value)} />
                    <TextField
                        label="Agency Service IDs (ngăn cách bởi dấu phẩy)"
                        value={newAgency.agencyServiceIds.join(',')}
                        onChange={(e) => handleChange('agencyServiceIds', e.target.value.split(',').map(id => id.trim()))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Hủy</Button>
                    <Button variant="contained" sx={{ backgroundColor: '#215858' }} onClick={handleAddAgency}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BranchManagement;
