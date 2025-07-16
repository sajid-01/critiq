import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  book: {
    id: string;
    title: string;
  };
}

const fetchUserReviews = async (userId: string, token: string): Promise<Review[]> => {
  const res = await axios.get(`http://localhost:5000/api/users/${userId}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const Profile = () => {
  const { user, token, isLoggedIn } = useAuth();

  const { data: reviews, isLoading, isError } = useQuery({
    queryKey: ['my-reviews'],
    queryFn: () => fetchUserReviews(user.id, token!),
    enabled: isLoggedIn,
  });

  if (!isLoggedIn) return <p>Please <Link to="/login">log in</Link> to view your profile.</p>;
  if (isLoading) return <p>Loading your reviews...</p>;
  if (isError) return <p>Error fetching your reviews.</p>;

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <h3>Your Reviews </h3>
      {(reviews || []).length === 0 ? (
        <p>You haven’t reviewed anything yet!</p>
      ) : (
        (reviews || []).map((review) => (
          <div key={review.id} style={{ marginBottom: '1rem' }}>
            <Link to={`/books/${review.book.id}`}>
              <strong>{review.book.title}</strong>
            </Link>
            <p>{review.rating+` star`} — {review.comment}</p>
            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
