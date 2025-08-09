import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../lib/api';
import Star from '../../components/Star';
import '../../App.css';
import { useEffect, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  featured?: boolean; // this is experimental, not implemented yet
  averageRating: number
};

const fetchBooks = async (): Promise<Book[]> => {
  const res = await axios.get(`${API_URL}/api/books`);
  return res.data;
};

const BookList = () => {
  const [search,setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("desc");
  const [currentBooks,setCurrentBooks] = useState<Book[]>([]);

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  useEffect(() =>{
    if(books) setCurrentBooks(books);
  },[books]);

  useEffect(() => {
    if (!books) return;

    let filtered = books.filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === 'new') {
      filtered = [...filtered].reverse();
    } else if (sort === 'asc') {
      filtered = [...filtered].sort((a, b) => a.averageRating - b.averageRating);
    } else if (sort === 'desc') {
      filtered = [...filtered].sort((a, b) => b.averageRating - a.averageRating);
    }
    setCurrentBooks(filtered);
  }, [books, search, sort]);

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement> ) => {
    setSearch(e.target.value);
  }

  const handleSort = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  }

  if (isLoading) return <p>Loading books...</p>;
  if (isError || !books) return <p>Error loading books.</p>;

  return (
    <div className="book-list-container fade-in">
      <div className='search-sort' >
        <input className='search' placeholder='Find a Book' onChange={handleSearch}/>
        <select className='sort' value={sort} onChange={handleSort}>
          <option value='desc'>Top Rated</option>
          <option value='asc'>Low Rated</option>
          <option value='new'>Newest First</option>
          <option value='old'>Oldest First</option>
        </select>
      </div>
      <h1 style={{ marginBottom: "1.5rem" }}>All Books</h1>
      <div className="book-grid">
        {currentBooks.length !==0 ? currentBooks.map((book, index) => (
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
        )) :
        <div className='empty-book-list'>
          <h2>No Books Found</h2>
        </div>
      }
      </div>
    </div>
  );
};

export default BookList;
