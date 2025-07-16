import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const AddReview = () => {
  const { id: bookId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/reviews',
        { rating, comment, bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/books/${bookId}`);
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  return (
    <div>
      <h2>Write Your Review </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((val) => (
              <option key={val} value={val}>{val} Stars</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
