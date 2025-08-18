import Sidebar from '../../components/thirdparty/Sidebar';
import Navbar from '../../components/thirdparty/Navbar';
import {
    Table, TableBody, TableCell, TableContainer, TablePagination,
    TableHead, TableRow, Paper, IconButton, TextField,
} from '@mui/material';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Star, StarBorder } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';

const BranchManagement = () => {
    const [agencyList, setAgencyList] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                            </div>

                            {/* Table */}
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Tên chi nhánh</strong></TableCell>
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
        </div>
    );
};

export default BranchManagement;
