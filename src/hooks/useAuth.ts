import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, selectCurrentUser, selectAuthError, selectIsLoading } from '../services/api/authSlice';

export const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);

  const requireAuth = (callback: () => void) => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', location.pathname);
      navigate('/login');
      return;
    }
    callback();
  };

  return {
    isAuthenticated,
    user,
    error,
    isLoading,
    requireAuth
  };
};
