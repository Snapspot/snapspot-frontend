import Sidebar from '../../components/thirdparty/Sidebar';
import Navbar from '../../components/thirdparty/Navbar';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Button, TablePagination
} from '@mui/material';
import { useState } from 'react';

const ThirdpartyPackage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Dữ liệu mẫu tạm thời
  const dummyPackages = [
    {
      id: 1,
      name: 'Gói cơ bản',
      duration: '1 tháng',
      price: '500.000₫',
      status: 'Đang sử dụng',
    },
    {
      id: 2,
      name: 'Gói nâng cao',
      duration: '3 tháng',
      price: '1.200.000₫',
      status: 'Hết hạn',
    },
    {
      id: 3,
      name: 'Gói VIP',
      duration: '6 tháng',
      price: '2.500.000₫',
      status: 'Đang sử dụng',
    },
  ];

  const filteredRows = dummyPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 relative flex flex-col overflow-hidden">

        {/* Background & overlay */}
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
              Gói đăng ký
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
                <Button variant="contained" sx={{ backgroundColor: '#215858' }}>
                  Thêm gói
                </Button>
              </div>

              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Tên gói</strong></TableCell>
                      <TableCell><strong>Thời hạn</strong></TableCell>
                      <TableCell><strong>Giá</strong></TableCell>
                      <TableCell><strong>Trạng thái</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedRows.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell>{pkg.name}</TableCell>
                        <TableCell>{pkg.duration}</TableCell>
                        <TableCell>{pkg.price}</TableCell>
                        <TableCell>{pkg.status}</TableCell>
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

export default ThirdpartyPackage;