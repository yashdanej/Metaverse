import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from '../pages/auth/Auth';

const PrivateRoute = () => {
    return isLogin() ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute