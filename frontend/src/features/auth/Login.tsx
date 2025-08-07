import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { API_URL } from '../../lib/api';
import '../../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorObj, setErrorObj] = useState<{ [key : string] : string}>({})

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setErrorObj((prev) => {
      const { submit, ...rest } = prev;
      return rest;
    });
    if(e.target.name === 'email'){
      setEmail(e.target.value);
      handleEmail(e.target.value);
    }else {
      setPassword(e.target.value);
      handlePassword(e.target.value);
    }
  }

  const handleEmail = (value : string) => {
    let error = "";
    if(!value.trim()){
      error = "Email is required";
      setErrorObj((prev) => ({ ...prev, email: error }));
    } else if (!/^(?![-.])(?!.*[-.]@)(?!.*[.-]{2})[\w.-]+\w@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      error = "Invalid email format";
      setErrorObj((prev) => ({ ...prev, email: error }));
    } else {
      setErrorObj((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  }

  const handlePassword = (value: string) => {
    let error = "";
    if (!value) {
      error = "Password is required";
      setErrorObj((prev) => ({ ...prev, password: error }));
    } else { 
      setErrorObj((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    handleEmail(email);
    handlePassword(password);
    if( Object.keys(errorObj).length > 0 ) return;

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setErrorObj((prev) => ({ ...prev, submit : 'Invalid Credentials' }));
    }
  };

   const isFormValid = 
    email.trim() !== "" &&
    password !== "" &&
    Object.keys(errorObj).length === 0;

  return (
    <div className="auth-container fade-in">
      <form className="auth-card slide-up" onSubmit={handleLogin}>
        <h2>Login</h2>
          <div className='input-error-wrapper'>
            <input
              className="auth-input"
              name='email'
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errorObj.email && <p className="error-text">{errorObj.email}</p>}
          </div>
        <div className="input-error-wrapper">
          <input
            className="auth-input"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errorObj.password && (
            <p className="error-text">{errorObj.password}</p>
          )}
        </div>

        <button className="auth-btn" type="submit" disabled={!isFormValid}>Login</button>
        {errorObj.submit && (
            <p className="error-text" style={{textAlign:'center'}}>{errorObj.submit}</p>
          )}
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
