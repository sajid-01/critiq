import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { API_URL } from '../../lib/api';
import '../../App.css'

const AdminPanel = () => {
  const { user, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [errorObj,setErrorObj] = useState< { [key:string] : string }>({});

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name ==='title'){
      setTitle(e.target.value)
      handleTitle(e.target.value);
    }else if (e.target.name === 'author'){
      handleAuthor(e.target.value);
      setAuthor(e.target.value);
    }else {
      handleImageURL(e.target.value);
      setCoverImage(e.target.value);
    }
  }

  const handleTitle = ( value : string ) => {
    let error="";
    if(!value.trim()){
      error= 'Book Title is required'
      setErrorObj((prev) => ({...prev,'title' : error}));
    }else {
      setErrorObj((prev) => {
        const { title , ...rest } = prev;
        return rest;
      })
    }
  }

  const handleAuthor = ( value : string ) => {
    let error="";
    if(!value.trim()){
      error= 'Name of Author is required'
      setErrorObj((prev) => ({...prev,'author' : error}));
    }else {
      setErrorObj((prev) => {
        const { author , ...rest } = prev;
        return rest;
      })
    }
  }

  const handleImageURL = ( value : string ) => {
    let error="";
    if(!value.trim()){
      error= 'Image URL is required'
      setErrorObj((prev) => ({...prev,'imageURL' : error}));
    }else {
      setErrorObj((prev) => {
        const { imageURL , ...rest } = prev;
        return rest;
      })
    }
  }

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

  const isFormValid = 
    title.trim() !== ""  &&
    author.trim() !== "" &&
    coverImage.trim() !== "" &&
    Object.keys(errorObj).length===0

  if (!isLoggedIn || user.role !== "ADMIN") {
    return <p className='error-text'>Access denied. You are not an admin.</p>;
  }

  return (
    <div className="admin-panel-container">
      <h2>Add a New Book (Admin Panel)</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={`auth-input ${errorObj.title ? "input-error" : ""}`}
          name = 'title'
          value={title}
          onChange={handleChange}
          placeholder="Book Title"
        />
        {errorObj.title && (<p className='error-text' style={{marginTop:'-0.75rem'}}>{errorObj.title}</p>)}
        <input
          className={`auth-input ${errorObj.author ? "input-error" : ""}`}
          name = 'author'
          value={author}
          onChange={handleChange}
          placeholder="Author"
        />
        {errorObj.author && (<p className='error-text' style={{marginTop:'-0.75rem'}}>{errorObj.author}</p>)}
        <input
          className={`auth-input ${errorObj.imageURL ? "input-error" : ""}`}
          name = 'imageURL'
          value={coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
        />
        {errorObj.imageURL && (<p className='error-text' style={{marginTop:'-0.75rem'}}>{errorObj.imageURL}</p>)}
        <button className='auth-btn' type="submit" disabled = {!isFormValid}>Add Book</button>
      </form>
    </div>
  );
};

export default AdminPanel;
