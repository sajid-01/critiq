import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../lib/api';
import Star from '../../components/Star';
import '../../App.css';

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

const fetchUserReviews = async (
  userId: string,
  token: string
): Promise<Review[]> => {
  const res = await axios.get(
    `${API_URL}/api/users/${userId}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

const Profile = () => {
  const { user, token, isLoggedIn } = useAuth();

  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: () => fetchUserReviews(user.id, token!),
    enabled: isLoggedIn,
  });

  if (!isLoggedIn)
    return (
      <p>
        Please <Link to="/login">log in</Link> to view your profile.
      </p>
    );
  if (isLoading) return <p>Loading your reviews...</p>;
  if (isError) return <p>Error fetching your reviews.</p>;

  console.log(user)

  return (
    <div className="profile-container fade-in">
      {user.profileImage && (
        <img src={user.profileImage} alt="Profile" className="profile-avatar" />
      )}
      <h1>{user.username}'s Profile</h1>
      {reviews && reviews.length > 0 && (
        <p className="average-rating">
          Average Rating:{" "}
          {(
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)}{" "}<Star/>
        </p>
      )}
      <h3 style={{marginBottom:'1rem'}}>Your Reviews</h3>

      {(reviews || []).length === 0 ? (
        <p>You haven’t reviewed anything yet!</p>
      ) : (
        (reviews || []).map((review) => (
          <div key={review.id} className="card slide-up review-card">
            <Link to={`/books/${review.book.id}`}>
              <h4 className="book-title">{review.book.title}</h4>
            </Link>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= review.rating ? "filled" : ""}
                >
                  &#9733;
                </span>
              ))}
            </div>

            <p className="comment">"{review.comment}"</p>
            <small className="date">
              {new Date(review.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
