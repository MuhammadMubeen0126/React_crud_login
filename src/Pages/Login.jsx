import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API errors
  const navigate = useNavigate();

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleLogin = async (values) => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Save token to localStorage
        
        navigate("/home"); // Redirect to home page
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || "An error occurred while logging in."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle forgot password navigation
  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  // Handle register navigation
  const handleRegister = () => {
    navigate("/register");
  };

  
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
  
      // Send the Google user data to your backend
      const response = await axios.post('http://localhost:5000/auth/google', decoded);
  
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Save token to localStorage
        console.log(response.data);
        navigate('/home'); // Redirect to home after successful login
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
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h1>

        {/* Display error message if any */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
            {error}
          </div>
        )}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {/* Register Button */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={loading}
                className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-4"
              >
                Register
              </button>

              {/* Google Login Button */}
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google authentication failed.')} />
            </Form>
          )}
        </Formik>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition duration-200"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default Login;