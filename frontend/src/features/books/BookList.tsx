import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import Star from '../../components/Star';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  featured?: boolean; // this is experimental, not implemented yet
  averageRating: number
};

const fetchBooks = async (): Promise<Book[]> => {
  const res = await axios.get("http://localhost:5000/api/books");
  return res.data;
};

const BookList = () => {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) return <p>Loading books...</p>;
  if (isError || !books) return <p>Error loading books.</p>;

  return (
    <div className="book-list-container fade-in">
      <h1 style={{ marginBottom: "1.5rem" }}>All Books</h1>
      <div className="book-grid">
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`card slide-up book-card ${
              book.featured ? "featured-card" : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link to={`/books/${book.id}`} data-testid="book-link">
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-cover"
                />
              )}
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              {book.averageRating !== null ? (
                <p className="average-rating">
                  {book.averageRating} <Star/>
                </p>
              ) : (
                <p className="no-rating">No reviews yet</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
