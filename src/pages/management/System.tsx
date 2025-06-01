import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
              Lịch sử Hệ Thống
            </Typography>

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
                  {logs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>
                        <Chip
                          label={log.type}
                          color={getChipColor(log.type)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{log.description}</TableCell>
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

export default System;
