import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { API_URL } from '../../lib/api';
import '../../App.css';


const AddReview = () => {
  const { id: bookId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/reviews`,
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
    <div className="review-container fade-in">
      <h2>Write Your Review</h2>
      <form className="review-form slide-up" onSubmit={handleSubmit}>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${hover !== null ? (star <= hover ? 'filled' : '') : star <= rating ? 'filled' : ''}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(star)}
            >
              &#9733;
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="review-textarea"
        />

        <button type="submit" className="add-review-btn">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
