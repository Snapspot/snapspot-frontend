import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Button,
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';

const reviews = [
  {
    id: 1,
    reviewer: 'Nguyễn Văn A',
    branch: 'Chi nhánh Hà Nội',
    company: 'Công ty ABC',
    rating: 4,
    comment: 'Dịch vụ rất tốt, nhân viên thân thiện.',
    time: '2025-05-31 10:15',
  },
  {
    id: 2,
    reviewer: 'Trần Thị B',
    branch: 'Chi nhánh HCM',
    company: 'Công ty XYZ',
    rating: 5,
    comment: 'Rất hài lòng với trải nghiệm.',
    time: '2025-05-30 14:30',
  },
];

const Review = () => {

  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Mở popup Duyệt
  const handleOpenApprove = (review: any) => {
    setSelectedReview(review);
    setOpenApproveDialog(true);
  };

  const handleOpenReject = (review: any) => {
    setSelectedReview(review);
    setOpenRejectDialog(true);
  };


  // Đóng popup Duyệt
  const handleCloseApprove = () => {
    setOpenApproveDialog(false);
    setSelectedReview(null);
  };


  // Đóng popup Từ chối
  const handleCloseReject = () => {
    setOpenRejectDialog(false);
    setSelectedReview(null);
  };

  // Xác nhận duyệt
  const handleConfirmApprove = () => {
    console.log('Đã duyệt:', selectedReview);
    // TODO: xử lý logic duyệt ở đây
    handleCloseApprove();
  };

  // Xác nhận từ chối
  const handleConfirmReject = () => {
    console.log('Đã từ chối:', selectedReview);
    // TODO: xử lý logic từ chối ở đây
    handleCloseReject();
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <div className="flex-1 ml-72 relative flex flex-col overflow-hidden">

        {/* Background ảnh thiên nhiên trắng đen */}
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-80 opacity-150"
          style={{
            backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
          }}
        ></div>

        {/* Overlay vàng kem vanilla phủ lên ảnh */}
        <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>

        {/* Nội dung */}
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
              Đánh giá người dùng
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
                    <TableCell><strong>#</strong></TableCell>
                    <TableCell><strong>Người đánh giá</strong></TableCell>
                    <TableCell><strong>Chi nhánh</strong></TableCell>
                    <TableCell><strong>Công ty</strong></TableCell>
                    <TableCell><strong>Rating</strong></TableCell>
                    <TableCell><strong>Bình luận</strong></TableCell>
                    <TableCell><strong>Thời gian</strong></TableCell>
                    <TableCell><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>{review.id}</TableCell>
                      <TableCell>{review.reviewer}</TableCell>
                      <TableCell>{review.branch}</TableCell>
                      <TableCell>{review.company}</TableCell>
                      <TableCell>
                        <Rating value={review.rating} readOnly />
                      </TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>{review.time}</TableCell>
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
                          onClick={() => handleOpenApprove(review)}
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
                          onClick={() => handleOpenReject(review)}
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
                count={reviews.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số dòng mỗi trang"
              />
            </TableContainer>
          </main>
        </div>
      </div>
      {/* Popup xác nhận duyệt */}
      <Dialog open={openApproveDialog} onClose={handleCloseApprove}>
        <DialogTitle sx={{ backgroundColor: '#215858', color: 'white' }}>
          Xác nhận duyệt
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#faebce' }}>
          Bạn có chắc chắn muốn duyệt đánh giá của <strong>{selectedReview?.reviewer}</strong> không?
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
          Bạn có chắc chắn muốn từ chối đánh giá của <strong>{selectedReview?.reviewer}</strong> không?
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

export default Review;
