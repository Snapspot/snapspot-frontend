import { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const backgroundImages = [
  'https://wander-lush.org/wp-content/uploads/2022/11/Hanoi-to-Halong-Bay-transport-guide-2023-new-DP-Junk-Boat.jpg',
  'https://vcdn1-dulich.vnecdn.net/2022/06/03/cau-vang-jpeg-mobile-4171-1654247848.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=xrjEn1shZLiHomFix1sHNQ',
  'https://upload.wikimedia.org/wikipedia/commons/f/f4/Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg',
  'https://image.vietnam.travel/sites/default/files/styles/top_banner/public/2017-06/vietnam-travel-5.jpg?itok=XVnHP3ty',
];

const fadeDuration = 3000; // ms
const displayDuration = 6000; // ms

const Register = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = 'Vui lòng nhập Email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    if (!agreeTerms) {
      newErrors.agreeTerms = 'Bạn phải đồng ý với điều khoản';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Xử lý đăng ký ở đây
      console.log({ email, password, agreeTerms });
    }
  };

  useEffect(() => {
    const changeImage = () => {
      setFade(true);

      timeoutRef.current = window.setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        setFade(false);
      }, fadeDuration);
    };

    changeImage();

    intervalRef.current = window.setInterval(() => {
      changeImage();
    }, displayDuration + fadeDuration);

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity ease-in-out will-change-opacity"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          opacity: fade ? 0 : 1,
          transitionDuration: `${fadeDuration}ms`,
          filter: 'blur(4px) brightness(0.8)',
          zIndex: -2,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: '#21484888', zIndex: -1 }} />

      {/* Content */}
      <div className="flex w-full h-full items-center justify-center gap-150 relative z-10">
        <div className="text-white text-4xl font-bold">
          <div className="mb-4">📸 SnapSpot</div>
          <p className="text-lg">Nơi lưu giữ những khoảnh khắc</p>
        </div>

        <Paper elevation={6} sx={{ padding: 5, width: 400, minHeight: 550 }}>
          <Typography variant="h4" mb={1} textAlign="center" fontWeight="bold" color="#214848">
            Đăng ký
          </Typography>
          <Typography variant="body2" mb={3} textAlign="center" color="text.secondary">
            Vui lòng điền thông tin để tạo tài khoản mới
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              required
              autoComplete="email"
            />
            <TextField
              label="Mật khẩu"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              required
              autoComplete="new-password"
            />
            <TextField
              label="Xác nhận mật khẩu"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              required
              autoComplete="new-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography fontSize={14}>
                  Tôi đồng ý với{' '}
                  <Link href="#" underline="hover">
                    Điều khoản sử dụng
                  </Link>
                </Typography>
              }
            />
            {errors.agreeTerms && (
              <Typography color="error" fontSize={12} mt={-1} mb={1}>
                {errors.agreeTerms}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#214848',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#163838' },
                fontWeight: 'bold',
                mt: 1,
              }}
            >
              Đăng ký
            </Button>

            <Typography variant="body2" mt={2} textAlign="center" color="text.secondary">
              Đã có tài khoản?{' '}
              <Link href="/login" underline="hover">
                Đăng nhập ngay
              </Link>
            </Typography>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default Register;
