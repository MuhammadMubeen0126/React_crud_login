import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/forgot-password", {
                email: email
            });

            if (response.status === 200) {
                console.log("user: ", response.data);
                localStorage.setItem("id", response.data._id);
               alert(response.data.message);
            } 
        } catch (error) {
            console.error('Login error:', error);
            alert("An error occurred while logging in.");
        }
    };
    return (
        <div className="max-w-sm mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-5">Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Enter your email to reset password
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="abc@gmail.com"
                        required
                    />
                </div>
                <button
                  onClick={() => navigate("/resetpassword")}
                    type="submit"
                    disabled={loading}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            {/* Back to login link */}
            <div className="mt-4 text-center">
                <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition duration-200"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default Forgotpassword;
