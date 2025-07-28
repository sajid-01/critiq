import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import Star from '../../components/Star';
import '../../App.css';

interface User {
  id: string;
  username: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  reviews: Review[];
  averageRating: number;
}

const fetchBook = async (bookId: string): Promise<Book> => {
  const res = await axios.get(`http://localhost:5000/api/books/${bookId}`);
  return res.data;
};

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useAuth();

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading book...</p>;
  if (isError || !book) return <p>Error loading book.</p>;

  return (
    <div className="book-details-container fade-in">
      <div className="book-details-card slide-up">
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="book-details-cover"
          />
        )}
        <div className="book-info">
          <h1>{book.title}</h1>
          <h3>by {book.author}</h3>
          {book.averageRating !== null ? (
            <p className="average-rating">{book.averageRating} <Star/></p>
          ) : (
            <p className="no-rating">No reviews yet</p>
          )}
        </div>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <div className="reviews-section">
        <h2>Reviews</h2>

        {book.reviews.length === 0 && (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {book.reviews.map((rev, index) => (
          <div
            key={rev.id}
            className="card slide-up review-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="review-header">
              <strong>{rev.user.username}</strong> — <Star/> {rev.rating}{" "}
              {/*have to revisit this part to give starcode(&#9733;) colors etc*/}
            </div>
            <p>{rev.comment}</p>
            <small>{new Date(rev.createdAt).toLocaleDateString()}</small>
          </div>
        ))}

        <div style={{ marginTop: "2rem" }}>
          {isLoggedIn ? (
            <Link to={`/books/${id}/review`}>
              <button className="btn">Add Your Review</button>
            </Link>
          ) : (
            <p>
              <Link to="/login">Log in</Link> to add a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
