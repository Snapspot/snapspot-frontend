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

        // Nếu lỗi 401 và chưa thử refresh token thì xử lý
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const res = await axios.post('http://14.225.217.24:8080/api/v1/auth/refresh-token', {
                    refreshToken: refreshToken
                });

                const newToken = res.data.token || res.data.accessToken;
                localStorage.setItem('accessToken', newToken); // đổi đúng key

                // Gắn token mới vào request ban đầu và gửi lại
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token thất bại:', refreshError);
                // Nếu không refresh được, redirect về login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
