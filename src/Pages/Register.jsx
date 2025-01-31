import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    age: Yup.number().positive('Age must be a positive number').integer('Age must be an integer').required('Age is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleRegister = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/user', values);
      if (response.status === 200) {
        alert('User registered successfully!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);


      // Send the Google user data to your backend
      const response = await axios.post('http://localhost:5000/auth/google', decoded);

      if (response.status === 200) {
        console.log(response.data)
        // alert('Google login successful!');
        // navigate('/home'); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      setError('Google authentication failed.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="81974192213-qkgt5odhp6f2k592u87himhja2ci49q4.apps.googleusercontent.com">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Register</h1>

          {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">{error}</div>}

          <Formik initialValues={{ name: '', email: '', age: '', password: '' }} validationSchema={validationSchema} onSubmit={handleRegister}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <Field type="text" name="name" className="w-full p-2.5 bg-gray-50 border rounded-lg text-gray-900 text-sm" placeholder="John Doe" />
                  <ErrorMessage name="name" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <Field type="email" name="email" className="w-full p-2.5 bg-gray-50 border rounded-lg text-gray-900 text-sm" placeholder="name@example.com" />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                  <Field type="number" name="age" className="w-full p-2.5 bg-gray-50 border rounded-lg text-gray-900 text-sm" placeholder="25" />
                  <ErrorMessage name="age" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <Field type="password" name="password" className="w-full p-2.5 bg-gray-50 border rounded-lg text-gray-900 text-sm" placeholder="••••••••" />
                  <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <button type="submit" disabled={loading || isSubmitting} className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4">
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-In Button */}
          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google authentication failed.')} />
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition duration-200">
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;