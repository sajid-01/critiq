import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '2rem' }}>
      <Link to="/">Home</Link> |{' '}
      {isLoggedIn && <Link to="/profile">Profile</Link>} |{' '}
      {isLoggedIn && user.role === 'ADMIN' && <Link to="/admin"> Admin</Link>} |{' '}
      {!isLoggedIn ? (
        <>
          <Link to="/login"> Login </Link> | <Link to="/register"> Register </Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
