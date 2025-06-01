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
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const packages = [
  {
    name: 'Gói Tiêu Chuẩn',
    description: 'Quảng bá trên các nền tảng cơ bản',
    branches: 5,
    price: '2.000.000đ',
    sold: 120,
    status: 'active',
  },
  {
    name: 'Gói Cao Cấp',
    description: 'Gồm truyền thông và mạng xã hội',
    branches: 12,
    price: '5.000.000đ',
    sold: 85,
    status: 'inactive',
  },
];

const Partner = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
          <main className="flex-1 p-6 overflow-auto">
            <Typography variant="h4" fontWeight={600} mb={3}>
              Quản lý Gói Tiếp Thị
            </Typography>

            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Tên gói</strong></TableCell>
                    <TableCell><strong>Mô tả</strong></TableCell>
                    <TableCell><strong>Chi nhánh</strong></TableCell>
                    <TableCell><strong>Giá</strong></TableCell>
                    <TableCell><strong>Đã bán</strong></TableCell>
                    <TableCell><strong>Trạng thái</strong></TableCell>
                    <TableCell align="center"><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map((pkg, index) => (
                    <TableRow key={index}>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>{pkg.description}</TableCell>
                      <TableCell>{pkg.branches}</TableCell>
                      <TableCell>{pkg.price}</TableCell>
                      <TableCell>{pkg.sold}</TableCell>
                      <TableCell>
                        <Chip
                          label={pkg.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                          color={pkg.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button size="small" color="primary" startIcon={<EditIcon />}>
                          Sửa
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          sx={{ ml: 1 }}
                        >
                          Xoá
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

export default Partner;
