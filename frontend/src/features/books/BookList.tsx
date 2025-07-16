import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
}

const fetchBooks = async (): Promise<Book[]> => {
  const res = await axios.get('http://localhost:5000/api/books');
  return res.data;
};

const BookList = () => {
  const { data: books, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  if (isLoading) return <p>Loading books...</p>;
  if (isError || !books) return <p>Error loading books.</p>;

  return (
    <div>
      <h1>All Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} style={{ margin: '20px 0' }}>
            <Link to={`/books/${book.id}`}>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              {book.coverImage && (
                <img src={book.coverImage} alt={book.title} style={{ width: '150px' }} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
