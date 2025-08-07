import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../lib/api";
import "../../App.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const [errorObj, setErrorObj] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validate(e);
  };

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      handleName(value);
    } else if (name === "email") {
      handleEmail(value);
    } else if (name === "password") {
      handlePassword(value);
    }
  };

  const handleName = (value: string) => {
    let error = "";
    if (!value.trim()) {
      error = "Username is required";
      setErrorObj((prev) => ({ ...prev, username: error }));
    } else {
      setErrorObj((prev) => {
        const { username, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleEmail = (value: string) => {
    let error = "";
    if (!value.trim()) {
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
  };

  const handlePassword = (value: string) => {
    let error = "";
    if (!value) {
      error = "Password is required";
      setErrorObj((prev) => ({ ...prev, password: error }));
    } else if (
      // !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) //a-z, A-Z, 0-9, special character finally length=8+ char
      !/^[a-zA-Z\d\W_]{8,}$/.test(value) //minimun 8 characters
    ) {
      error =
        "Password must be at least 8 characters";
      setErrorObj((prev) => ({ ...prev, password: error }));
    } else {
      setErrorObj((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  };

  const isFormValid =
    form.username.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password !== "" &&
    Object.keys(errorObj).length === 0;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(errorObj).length > 0) {
      setErrorObj(errorObj);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container fade-in">
      <form className="auth-card slide-up" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="input-error-wrapper">
          <input
            className={`auth-input ${errorObj.username ? "input-error" : ""}`}
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          {errorObj.username && (
            <p className="error-text">{errorObj.username}</p>
          )}
        </div>
        <div className="input-error-wrapper">
          <input
            className={`auth-input ${errorObj.email ? "input-error" : ""}`}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errorObj.email && <p className="error-text">{errorObj.email}</p>}
        </div>
        <div className="input-error-wrapper">
          <input
            className={`auth-input ${errorObj.password ? "input-error" : ""}`}
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {errorObj.password && (
            <p className="error-text">{errorObj.password}</p>
          )}
        </div>
        <div
          className="button-tooltip-wrapper"
          title={!isFormValid ? "Please fill out all fields correctly." : ""}
        >
          <button className="auth-btn" type="submit" disabled={!isFormValid}>
            Register
          </button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
