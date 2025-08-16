import { useEffect, useState, useRef } from 'react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    Box,
    Link,
    Checkbox,
    FormControlLabel,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import axiosInstance from '../utils/axiosInstance';
import React from 'react';

const backgroundImages = [
    'https://wander-lush.org/wp-content/uploads/2022/11/Hanoi-to-Halong-Bay-transport-guide-2023-new-DP-Junk-Boat.jpg',
    'https://vcdn1-dulich.vnecdn.net/2022/06/03/cau-vang-jpeg-mobile-4171-1654247848.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=xrjEn1shZLiHomFix1sHNQ',
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg',
    'https://image.vietnam.travel/sites/default/files/styles/top_banner/public/2017-06/vietnam-travel-5.jpg?itok=XVnHP3ty',
];

const fadeDuration = 3000; // ms
const displayDuration = 6000; // ms

const Login = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Khai báo useRef kiểu number hoặc null
    const timeoutRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                // Nếu đã đăng nhập, redirect về trang phù hợp
                switch (userRole) {
                    case 'Admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'ThirdParty':
                        navigate('/third-party/dashboard');
                        break;
                    case 'Staff':
                        navigate('/view-booking');
                        break;
                    case 'Customer':
                        navigate('/booking');
                        break;
                    default:
                        console.warn('Vai trò không xác định:', userRole);
                }
            } catch (err) {
                console.error('Token không hợp lệ:', err);
                // Nếu token lỗi thì xóa luôn cho sạch
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning',
    });
    
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setSnackbar({ open: true, message, severity });
    };

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!email) {
            newErrors.email = 'Vui lòng nhập Email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true); // ⏳ Bắt đầu loading

        try {
            const loginURL = '/v1/auth/login';
            console.log('🔗 URL đang gọi:', loginURL);

            const response = await axiosInstance.post(loginURL, {
                email,
                password
            });

            const { accessToken, refreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const decoded: any = jwtDecode(accessToken);
            const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            showSnackbar('Đăng nhập thành công!', 'success');

            // Delay nhỏ trước khi redirect (tuỳ chọn)
            setTimeout(() => {
                switch (userRole) {
                    case 'Admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'ThirdParty':
                        navigate('/third-party/dashboard');
                        break;
                    default:
                        console.warn('Vai trò không xác định:', userRole);
                }
            }, 800); // delay 800ms để thấy rõ loading

        } catch (error: any) {
            console.error('Lỗi đăng nhập:', error);
            const rawMessage = error.response?.data?.message;

            let errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
            if (rawMessage) {
                if (rawMessage === 'Please check the detailed error list for more information.') {
                    errorMessage = 'Email hoặc mật khẩu không chính xác.';
                } else {
                    errorMessage = rawMessage;
                }
            }
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const changeImage = () => {
            setFade(true); // fade out hiện tại

            timeoutRef.current = window.setTimeout(() => {
                setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length);
                setFade(false); // fade in ảnh mới
            }, fadeDuration);
        };

        // Chạy lần đầu
        changeImage();

        // Lặp lại theo interval
        intervalRef.current = window.setInterval(() => {
            changeImage();
        }, displayDuration + fadeDuration);

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen w-screen flex flex-col relative overflow-hidden">
            <Navbar />
            <div 
                className={`flex relative overflow-hidden ${
                    isMobile ? 'min-h-screen' : 'h-screen'
                } w-screen`}
            >
                {/* Background hiện tại */}
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

                {/* Overlay màu */}
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: '#21484888', zIndex: -1 }}
                />

                {/* Nội dung */}
                <div 
                    className={`flex w-full h-full items-center justify-center relative z-10 ${
                        isMobile 
                            ? 'flex-col gap-8 py-8 px-4' 
                            : 'gap-130'
                    }`}
                >
                    {/* Logo Section */}
                    <div 
                        className={`text-white text-center ${
                            isMobile 
                                ? 'order-1' 
                                : ''
                        }`}
                    >
                        <img 
                            src="/images/logo2-03.png" 
                            alt="Logo SnapSpot" 
                            className={`mb-4 h-auto mx-auto ${
                                isSmallMobile 
                                    ? 'w-32' 
                                    : isMobile 
                                        ? 'w-40' 
                                        : 'w-150'
                            }`} 
                        />
                        <Typography 
                            variant={isSmallMobile ? 'h6' : isMobile ? 'h5' : 'h4'} 
                            component="h1"
                            sx={{ 
                                fontWeight: 'bold',
                                mb: 1
                            }}
                        >
                            SnapSpot
                        </Typography>
                        <Typography 
                            variant={isSmallMobile ? 'body2' : 'h6'}
                            sx={{ 
                                fontWeight: 'light',
                                letterSpacing: '0.05em'
                            }}
                        >
                            Chụp đúng nơi - Tỏa sáng đúng chất
                        </Typography>
                    </div>

                    {/* Form Section */}
                    <Paper 
                        elevation={6} 
                        sx={{ 
                            padding: isMobile ? 3 : 5, 
                            width: isMobile ? '100%' : 400,
                            maxWidth: isMobile ? '400px' : '400px',
                            minHeight: isMobile ? 'auto' : 500,
                            marginTop: isMobile ? 0 : 0,
                            order: isMobile ? 2 : 'unset'
                        }}
                    >
                        <Typography 
                            variant={isMobile ? "h5" : "h4"} 
                            mb={1} 
                            textAlign="center" 
                            fontWeight="bold" 
                            color="#214848"
                        >
                            Đăng nhập
                        </Typography>
                        <Typography 
                            variant="body2" 
                            mb={3} 
                            textAlign="center" 
                            color="text.secondary"
                        >
                            Vui lòng nhập thông tin tài khoản của bạn để tiếp tục
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
                                name="email"
                                id="email"
                                size={isMobile ? "medium" : "medium"}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                autoComplete="email"
                                required
                            />
                            <TextField
                                label="Mật khẩu"
                                variant="outlined"
                                type="password"
                                fullWidth
                                name="password"
                                id="password"
                                size={isMobile ? "medium" : "medium"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                autoComplete="current-password"
                                required
                            />
                            
                            <Box 
                                display="flex" 
                                justifyContent="space-between" 
                                alignItems="center" 
                                mb={1}
                                flexDirection={isSmallMobile ? 'column' : 'row'}
                                gap={isSmallMobile ? 1 : 0}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={remember}
                                            onChange={e => setRemember(e.target.checked)}
                                            color="primary"
                                            size={isMobile ? "small" : "medium"}
                                        />
                                    }
                                    label={
                                        <Typography fontSize={isMobile ? 13 : 14}>
                                            Ghi nhớ đăng nhập
                                        </Typography>
                                    }
                                />
                                <Link 
                                    href="#" 
                                    underline="hover" 
                                    fontSize={isMobile ? 13 : 14}
                                >
                                    Quên mật khẩu?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#214848',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#163838' },
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 1,
                                    py: isMobile ? 1.5 : 1.2,
                                }}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={20} color="inherit" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    'Đăng nhập'
                                )}
                            </Button>

                            <Typography 
                                variant="body2" 
                                mt={2} 
                                textAlign="center" 
                                color="text.secondary"
                                fontSize={isMobile ? 13 : 14}
                            >
                                Chưa có tài khoản?{' '}
                                <Link href="/register" underline="hover">
                                    Đăng ký ngay
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </div>
            </div>
            <Footer />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ 
                    vertical: 'top', 
                    horizontal: isMobile ? 'center' : 'right' 
                }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;