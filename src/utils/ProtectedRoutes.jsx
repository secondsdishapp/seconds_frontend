import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/FirebaseAuth/AuthContext.jsx';

export default function ProtectedRoutes({ isLoggedIn }) {

  const {
    currentUser,
    signUpWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  } = useContext(AuthContext);

  return (
    currentUser. ? <Outlet /> : <Navigate to="/auth" />;
  )
}
