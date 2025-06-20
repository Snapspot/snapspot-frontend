import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, Avatar, TablePagination, Dialog, DialogTitle,
    DialogContent, DialogActions
} from '@mui/material';
import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';

interface pendingPartners {
    id: number;
    name: string;
    phone: string;
    email: string;
    status: string;
    photo: string;
}

const pendingPartners = [
    {
        id: 1,
        name: 'Studio C',
        phone: '0111222333',
        email: 'studioC@mail.com',
        status: 'Chờ duyệt',
        photo: 'https://i.pravatar.cc/40?img=5',
    },
    {
        id: 2,
        name: 'Studio D',
        phone: '0999888777',
        email: 'studioD@mail.com',
        status: 'Chờ duyệt',
        photo: 'https://i.pravatar.cc/40?img=6',
    },
];

const PartnerApproval = () => {

    const [openApproveDialog, setOpenApproveDialog] = useState(false);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<any>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenApprove = (partner: any) => {
        setSelectedPartner(partner);
        setOpenApproveDialog(true);
    };

    const handleCloseApprove = () => {
        setOpenApproveDialog(false);
        setSelectedPartner(null);
    };

    const handleOpenReject = (partner: any) => {
        setSelectedPartner(partner);
        setOpenRejectDialog(true);
    };

    const handleCloseReject = () => {
        setOpenRejectDialog(false);
        setSelectedPartner(null);
    };

    const handleConfirmApprove = () => {
        console.log(`Duyệt đối tác: ${selectedPartner?.name}`);
        // TODO: gọi API duyệt
        handleCloseApprove();
    };

    const handleConfirmReject = () => {
        console.log(`Từ chối đối tác: ${selectedPartner?.name}`);
        // TODO: gọi API từ chối
        handleCloseReject();
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedRows = pendingPartners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                            Danh sách đối tác chờ duyệt
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
                                        <TableCell><strong>Tên đối tác</strong></TableCell>
                                        <TableCell><strong>SĐT</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Trạng thái</strong></TableCell>
                                        <TableCell><strong>Thao tác</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedRows.map((pendingPartners) => (
                                        <TableRow key={pendingPartners.id}>
                                            <TableCell><Avatar src={pendingPartners.photo} alt={pendingPartners.name} /></TableCell>
                                            <TableCell>{pendingPartners.name}</TableCell>
                                            <TableCell>{pendingPartners.phone}</TableCell>
                                            <TableCell>{pendingPartners.email}</TableCell>
                                            <TableCell>{pendingPartners.status}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        mr: 1,
                                                        backgroundColor: '#215858',
                                                        '&:hover': { backgroundColor: '#1a4646' },
                                                        textTransform: 'none',
                                                    }}
                                                    onClick={() => handleOpenApprove(pendingPartners)}
                                                >
                                                    Duyệt
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        color: '#215858',
                                                        borderColor: '#215858',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(33, 88, 88, 0.1)',
                                                            borderColor: '#215858',
                                                        },
                                                        textTransform: 'none',
                                                    }}
                                                    onClick={() => handleOpenReject(pendingPartners)}
                                                >
                                                    Từ chối
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={pendingPartners.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Số dòng mỗi trang"
                            />
                        </TableContainer>
                    </div>
                </div>
            </div>
            {/* Popup xác nhận duyệt */}
            <Dialog open={openApproveDialog} onClose={handleCloseApprove}>
                <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
                    Xác nhận duyệt
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#faebce' }}>
                    Bạn có chắc chắn muốn duyệt thành viên <strong>{selectedPartner?.name}</strong> không?
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#faebce' }}>
                    <Button
                        variant="outlined"
                        onClick={handleCloseApprove}
                        sx={{ color: '#215858', borderColor: '#215858' }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmApprove}
                        sx={{
                            backgroundColor: '#215858',
                            color: 'white',
                            '&:hover': { backgroundColor: '#1a4646' },
                        }}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Popup xác nhận từ chối */}
            <Dialog open={openRejectDialog} onClose={handleCloseReject}>
                <DialogTitle sx={{ backgroundColor: '#7a1e1e', color: 'white' }}>
                    Xác nhận từ chối
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#faebce' }}>
                    Bạn có chắc chắn muốn từ chối duyệt thành viên <strong>{selectedPartner?.name}</strong> không?
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#faebce' }}>
                    <Button
                        variant="outlined"
                        onClick={handleCloseReject}
                        sx={{ color: '#7a1e1e', borderColor: '#7a1e1e' }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmReject}
                        sx={{
                            backgroundColor: '#7a1e1e',
                            color: 'white',
                            '&:hover': { backgroundColor: '#1a4646' },
                        }}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PartnerApproval;
