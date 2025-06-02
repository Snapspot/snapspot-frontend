import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from '@mui/material';
import { useState } from 'react';

const logs = [
  {
    id: 'SYS001',
    time: '2025-05-30 10:15:23',
    type: 'Cập nhật',
    description: 'Cập nhật thông tin hệ thống.',
  },
  {
    id: 'SYS002',
    time: '2025-05-30 11:05:10',
    type: 'Lỗi',
    description: 'Lỗi kết nối đến máy chủ sao lưu.',
  },
  {
    id: 'SYS003',
    time: '2025-05-30 13:45:00',
    type: 'Xoá',
    description: 'Xoá gói tiếp thị không sử dụng.',
  },
];

const getChipColor = (type: string) => {
  switch (type) {
    case 'Cập nhật':
      return 'primary';
    case 'Lỗi':
      return 'error';
    case 'Xoá':
      return 'warning';
    default:
      return 'default';
  }
};

const System = () => {
  const [filterType, setFilterType] = useState('Truy cập');
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
            <h1 className="text-3xl font-bold mb-4">Lịch sử hệ thống</h1>

            {/* Thanh tìm kiếm và dropdown */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
              {/* Tìm kiếm */}
              <TextField
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Dropdown */}
              <FormControl size="small">
                <InputLabel id="filter-label">Loại</InputLabel>
                <Select
                  labelId="filter-label"
                  value={filterType}
                  label="Loại"
                  onChange={(e) => setFilterType(e.target.value)}
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="Truy cập">Truy cập</MenuItem>
                  <MenuItem value="Kiểm toán">Kiểm toán</MenuItem>
                  <MenuItem value="Hệ thống">Hệ thống</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Thời gian</strong></TableCell>
                    <TableCell><strong>Loại</strong></TableCell>
                    <TableCell><strong>Mô tả</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map((logs) => (
                    <TableRow key={logs.id}>
                      <TableCell>{logs.id}</TableCell>
                      <TableCell>{logs.time}</TableCell>
                      <TableCell>
                        <Chip
                          label={logs.type}
                          color={getChipColor(logs.type)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{logs.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={logs.length}
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
    </div>
  );
};

export default System;
