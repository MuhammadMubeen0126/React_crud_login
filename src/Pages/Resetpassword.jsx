import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const {token} = useParams();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`http://127.0.0.1:5000/reset-password/${token}`, {
                _id: localStorage.getItem("id"),
                password: password,
                token: token
            });
            if (response.status === 200) {
                console.log(response.data)
              alert(response.data.message);
              localStorage.removeItem("id");
              navigate("/login");
            } else {
              alert("Password reset failed.");
            }
        } catch (error) {
           alert("An error occurred while resetting password.");
        }
        setLoading(false);
    };
    return (
        <div className="max-w-sm mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-5">Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Enter your new password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
           
        </div>
    );
};

export default ResetPassword;
