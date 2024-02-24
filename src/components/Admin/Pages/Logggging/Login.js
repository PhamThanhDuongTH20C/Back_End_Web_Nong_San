import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import './assets/Login.css';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [usernameerror, setUsernameerror] = useState('');
  const [passworderror, setPassworderror] = useState('');

  const validate = () => {
    if (username.trim() === '' && password.trim() === '') {
      setUsernameerror('Vui Lòng Nhập Username');
      setPassworderror('Vui Lòng Nhập Password.');
      return { valid: false };
    } else if (username.trim() === '') {
      setUsernameerror('Vui Lòng Nhập Username');
      setPassworderror(''); // Reset the password error if there was one
      return { valid: false };
    } else if (password.trim() === '') {
      setUsernameerror(''); // Reset the username error if there was one
      setPassworderror('Vui Lòng Nhập Password.');
      return { valid: false };
    } else {
      setUsernameerror(''); // Reset both errors if the validation is successful
      setPassworderror('');
      return { valid: true };
    }
  };



  const proceedLoginUsingAPI = async (e) => {
    e.preventDefault();
    if (validate()) {
      const inputObj = {
        email: username,
        password: password,
      };

      try {
        const response = await fetch('http://localhost:5001/api/users/loginAdmin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputObj),
        });

        if (response.ok) {
          const data = await response.json();
          const accessToken = data.accessToken;
          console.log("sda", data)
          const decodedToken = jwt_decode(accessToken);

          if (decodedToken.user.isAdmin === true) {
            navigate('/admin');
            console.log('User is an admin');
          } else {
            console.log(data)
            console.log('User is not an admin', data.status);
          }
          localStorage.setItem('accessToken', accessToken);
        } else {
          setLoginError('Tài khoản hoặc mật khẩu không chính xác.');
          console.error('Login failed');
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    // If the user is already logged in, redirect them to the admin page
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.user.isAdmin === true) {
        navigate('/admin');
      }
    }
  }, [navigate]);

  return (
    <div className="center">
      <h3 style={{ textAlign: 'center', paddingTop: '20px' }}>
        <span style={{ fontWeight: 'bold' }}>Admin LƯU GIA</span>
      </h3>
      <form>
        <div className="txt_field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span />
          <label>Tên đăng nhập</label>
        </div>
        <div className="input-error">{usernameerror}</div> {/* Separate error message */}
        <div className="txt_field">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span />
          <label>Mật khẩu</label>
        </div>
        <div className="input-error">{passworderror}</div>
        <div className="input-error">{loginError}</div>
        <input type="submit" value="Đăng Nhập" onClick={proceedLoginUsingAPI} />
      </form>
    </div>
  );
};

export default Login;
