// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

type Props = {
  allowedRoles: string[];
};

const PrivateRoute = ({ allowedRoles }: Props) => {
  const token = localStorage.getItem('accessToken');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded: any = jwtDecode(token);
    const userRole = decoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];

    return allowedRoles.includes(userRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" replace />
    );
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
