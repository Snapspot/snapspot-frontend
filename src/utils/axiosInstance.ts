import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://14.225.217.24:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: Gắn access token vào mọi request
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor: Xử lý khi access token hết hạn
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error("No refresh token");

                // Tạo instance riêng để tránh loop interceptor
                const refreshInstance = axios.create({
                    baseURL: 'http://14.225.217.24:8080/api',
                    headers: { 'Content-Type': 'application/json' }
                });

                const res = await refreshInstance.post('/v1/auth/refresh-token', {
                    refreshToken
                });

                const newToken = res.data.data?.accessToken; // đảm bảo đúng field trả về
                if (!newToken) throw new Error("No access token in refresh response");

                localStorage.setItem('accessToken', newToken);

                // Gắn token mới vào request cũ và gửi lại
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.error('Refresh token thất bại:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
