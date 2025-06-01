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
  IconButton,
  Chip,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
const services = [
  {
    id: 1,
    name: 'Chăm sóc da mặt',
    color: '#FFB6C1',
    status: 'active',
  },
  {
    id: 2,
    name: 'Massage body',
    color: '#90EE90',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Điều trị mụn chuyên sâu',
    color: '#ADD8E6',
    status: 'active',
  },
];

const Service = () => {
        const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Background ảnh thiên nhiên */}
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale brightness-125 opacity-40"
          style={{
            backgroundImage:
              "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[rgba(130,90,50,0.15)]"></div>

        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
            <h1 className="text-3xl font-bold mb-4">Danh sách dịch vụ</h1>

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
                    <TableCell><strong>Tên dịch vụ</strong></TableCell>
                    <TableCell><strong>Màu</strong></TableCell>
                    <TableCell><strong>Trạng thái</strong></TableCell>
                    <TableCell><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((service, index) => (
                    <TableRow key={service.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            backgroundColor: service.color,
                            width: 40,
                            height: 20,
                            borderRadius: 4,
                            border: '1px solid #ccc',
                          }}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            service.status === 'active'
                              ? 'Đang hoạt động'
                              : 'Ngừng hoạt động'
                          }
                          color={service.status === 'active' ? 'success' : 'default'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
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

export default Service;
