
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import BookDetails from '../features/books/BookDetails';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Profile from '../features/profile/Profile';
import AdminPanel from '../features/admin/AdminPanel';
import AddReview from '../features/reviews/AddReview';

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* children will render here */}
  </>
);

// const router = createBrowserRouter([
//   { path: '/', element: <Home /> },
//   { path: '/books/:id', element: <BookDetails /> },
//   { path: '/books/:id/review', element: <AddReview /> },
//   { path: '/login', element: <Login /> },
//   { path: '/register', element: <Register /> },
//   { path: '/profile', element: <Profile /> },
//   { path: '/admin', element: <AdminPanel /> }
// ]);
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'books/:id', element: <BookDetails /> },
      { path: 'books/:id/review', element: <AddReview /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      { path: 'admin', element: <AdminPanel /> },
    ]
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
