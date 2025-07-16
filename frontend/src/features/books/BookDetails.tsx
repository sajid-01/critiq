import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

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
}

const fetchBook = async (bookId: string): Promise<Book> => {
  const res = await axios.get(`http://localhost:5000/api/books/${bookId}`);
  return res.data;
};

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useAuth();

  const { data: book, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading book...</p>;
  if (isError || !book) return <p>Error loading book.</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <h3>by {book.author}</h3>
      {book.coverImage && <img src={book.coverImage} alt={book.title} width={200} />}
      
      <hr />

      <h2>Reviews </h2>
      {book.reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}

      {book.reviews.map((rev) => (
        <div key={rev.id} style={{ marginBottom: '1rem' }}>
          <strong>{rev.user.username}</strong> — {rev.rating + ` Star`}
          <p>{rev.comment}</p>
          <small>{new Date(rev.createdAt).toLocaleDateString()}</small>
        </div>
      ))}

      <hr />

      {isLoggedIn ? (
        <Link to={`/books/${id}/review`}>
          <button>Add Your Review</button>
        </Link>
      ) : (
        <p><Link to="/login">Log in</Link> to add a review.</p>
      )}
    </div>
  );
};

export default BookDetails;
