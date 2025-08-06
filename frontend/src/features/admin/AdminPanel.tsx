import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { API_URL } from '../../lib/api';

const AdminPanel = () => {
  const { user, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/books/admin/books`,
        { title, author, coverImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (err) {
      alert("Only admins can add books!");
    }
  };

  if (!isLoggedIn || user.role !== "ADMIN") {
    return <p>Access denied. You are not an admin.</p>;
  }

  return (
    <div className="admin-panel-container">
      <h2>Add a New Book (Admin Panel)</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <input
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Cover Image URL"
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AdminPanel;
