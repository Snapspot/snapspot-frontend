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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const backgroundImages = [
    'https://wander-lush.org/wp-content/uploads/2022/11/Hanoi-to-Halong-Bay-transport-guide-2023-new-DP-Junk-Boat.jpg',
    'https://vcdn1-dulich.vnecdn.net/2022/06/03/cau-vang-jpeg-mobile-4171-1654247848.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=xrjEn1shZLiHomFix1sHNQ',
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg',
    'https://image.vietnam.travel/sites/default/files/styles/top_banner/public/2017-06/vietnam-travel-5.jpg?itok=XVnHP3ty',
];

const fadeDuration = 3000; // ms
const displayDuration = 6000; // ms


const Login = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Khai báo useRef kiểu number hoặc null
    const timeoutRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    const navigate = useNavigate();



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log({ email, password, remember }); // vẫn có thể giữ log này
            navigate('/dashboard'); // chuyển trang
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
        <div className="h-screen w-screen flex relative overflow-hidden">
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
            <div className="flex w-full h-full items-center justify-center gap-130 relative z-10">
                <div className="text-white text-4xl font-bold">
                    <img src="/images/logo2-03.png" alt="Logo SnapSpot" className="mb-4 w-150 h-auto" />
                    <p className="text-xl font-extralight tracking-wide">Chụp đúng nơi - Tỏa sáng đúng chất</p>

                </div>

                <Paper elevation={6} sx={{ padding: 5, width: 400, minHeight: 500 }}>

                    <Typography variant="h4" mb={1} textAlign="center" fontWeight="bold" color="#214848">
                        Đăng nhập
                    </Typography>
                    <Typography variant="body2" mb={3} textAlign="center" color="text.secondary">
                        Vui lòng nhập thông tin tài khoản của bạn để tiếp tục
                    </Typography>
                    <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit} noValidate>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            id="email"
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
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            autoComplete="current-password"
                            required
                        />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={e => setRemember(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Ghi nhớ đăng nhập"
                            />
                            <Link href="#" underline="hover" fontSize={14}>
                                Quên mật khẩu?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#214848',
                                borderRadius: 2,
                                '&:hover': { backgroundColor: '#163838' },
                                fontWeight: 'bold',
                            }}
                        >
                            Đăng nhập
                        </Button>

                        <Typography variant="body2" mt={2} textAlign="center" color="text.secondary">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" underline="hover">
                                Đăng ký ngay
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </div>
        </div>
    );
};

export default Login;
