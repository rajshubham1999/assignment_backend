import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FaPlus } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { RegisterUser } from '../../apicalls/users';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password'), null], 'Passwords must match'),
  name: yup.string().required('Name is required'),
  termsAndConditions: yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
});

const Register = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const loginclicked = () => {
    navigate('/login');
  };

  const onSubmit = async (data) => {
    try {
      const response = await RegisterUser(data);
      
      if (response.success) {
        setRegisterMessage('Registration successful!');
        setTimeout(() => {
          setRegisterMessage('');
          navigate('/');
        }, 1000);
        localStorage.setItem('token', response.jwt)
      }
    } catch (err) {
      console.log(err);
    }
    reset(); // Clear form fields after submission
    
  };

  return (
    <div className="container">
      {registerMessage && (
        <div className="success-message">
          <span className="tick">✓</span>
          {registerMessage}
        </div>
      )}
      <h2>Welcome Register!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group profile-picture">
          <label>Profile</label>
          <div className="profile-image-wrapper">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" />
            ) : (
              <div className="add-icon" onClick={() => document.getElementById('fileInput').click()}>
                <FaPlus />
                <input type="file" id="fileInput" accept="image/*" onChange={handlePictureChange} style={{ display: 'none' }} />
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>
        <div className="form-group terms">
          <input type="checkbox" {...register('termsAndConditions')} />
          <label>I agree to the terms and conditions</label>
          {errors.termsAndConditions && <p className="error">{errors.termsAndConditions.message}</p>}
        </div>
        <div className='already-account' onClick={loginclicked}>
          Already account? login
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;