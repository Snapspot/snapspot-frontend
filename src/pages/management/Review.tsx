import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Rating,
  Typography,
    TextField,
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
    const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale brightness-125 opacity-40"
          style={{
            backgroundImage:
              "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[rgba(130,90,50,0.15)]"></div>

        {/* Nội dung */}
        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
            <Typography variant="h4" fontWeight={600} mb={3}>
              Đánh Giá Người Dùng
            </Typography>

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
                  {reviews.map((review) => (
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
                          color="success"
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          Duyệt
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                        >
                          Từ chối
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Review;
