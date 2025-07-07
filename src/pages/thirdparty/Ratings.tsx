import Sidebar from '../../components/thirdparty/Sidebar';
import Navbar from '../../components/thirdparty/Navbar';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Button, TablePagination
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';

const ThirdpartyRatings = () => {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Lấy dữ liệu từ API
  useEffect(() => {
    axios.get('/third-party/feedbacks')
      .then((res) => {
        setFeedbackList(res.data.data || []);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy danh sách đánh giá:', err);
      });
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <Star key={i} sx={{ color: '#f5a623', fontSize: 20 }} />
        ) : (
          <StarBorder key={i} sx={{ color: '#f5a623', fontSize: 20 }} />
        )
      );
    }
    return stars;
  };

  const filteredRows = feedbackList.filter(f =>
    f.agencyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 relative flex flex-col overflow-hidden">

        {/* Background & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-80 opacity-150"
          style={{
            backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>

        {/* Nội dung */}
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
              Đánh giá
            </h1>

            <div style={{ padding: '24px' }}>
              {/* Search + Add */}
              <div className="flex justify-between items-center mb-4">
                <TextField
                  label="Tìm kiếm"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="contained" sx={{ backgroundColor: '#215858' }}>
                  Thêm đánh giá
                </Button>
              </div>

              {/* Table */}
              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Người đánh giá</strong></TableCell>
                      <TableCell><strong>Tên dịch vụ</strong></TableCell>
                      <TableCell><strong>Đánh giá</strong></TableCell>
                      <TableCell><strong>Nội dung</strong></TableCell>
                      <TableCell><strong>Ngày tạo</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedRows.map((feedback, index) => (
                      <TableRow key={index}>
                        <TableCell>{feedback.fullName}</TableCell>
                        <TableCell>{feedback.agencyName}</TableCell>
                        <TableCell>{renderStars(feedback.rating)}</TableCell>
                        <TableCell>{feedback.content}</TableCell>
                        <TableCell>
                          {new Date(feedback.createdDate).toLocaleDateString('vi-VN')}
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

export default ThirdpartyRatings;