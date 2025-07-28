import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../App.css'; // Global styles

const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar fade-in">
      <div className="nav-left">
        <Link to="/" className="logo">Critiq</Link>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/profile">Profile</Link>}
        {isLoggedIn && user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
