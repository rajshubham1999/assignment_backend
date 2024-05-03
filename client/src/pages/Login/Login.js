import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await LoginUser(data);
      if (response.success) {
        setLoginMessage('Login successful!');
        setTimeout(() => {
          setLoginMessage('');
          navigate('/');
        }, 1000);
        localStorage.setItem('token', response.jwt)
      }
    } catch (err) {
      console.log(err);
    }
    reset(); // Clear form fields after submission
  };

  const registerClicked = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      {loginMessage && (
        <div className="success-message">
          <span className="tick">✓</span>
          {loginMessage}
        </div>
      )}
      <h2>Welcome, Login!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="text" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <div className='new-here' onClick={registerClicked}>
          New here? Register
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;