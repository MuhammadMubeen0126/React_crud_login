import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setUsers(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveUser = async (values) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:5000/user", values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("User created successfully!");
      fetchData();
    } catch (error) {
      alert("Failed to create user.");
    }
  };

  const updateUser = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/${editUser._id}`, values);
      alert("User updated successfully!");
      fetchData();
      setEditUser(null);
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/user/${id}`);
      alert("User deleted successfully!");
      fetchData();
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    age: Yup.number().positive("Age must be a positive number").required("Age is required"),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have logged out.");
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">Logout</button>
      </div>

      <Formik
        initialValues={{ name: editUser?.name || '', email: editUser?.email || '', age: editUser?.age || '' }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          editUser ? await updateUser(values) : await saveUser(values);
          resetForm();
          fetchData();
          setEditUser(null);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{editUser ? "Edit User" : "Create User"}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Field name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter name" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Field name="email" type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter email" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <Field name="age" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter age" />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">{editUser ? "Update" : "Create"}</button>
          </Form>
        )}
      </Formik>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Users List</h2>
        {loading ? <p className="text-gray-600">Loading users...</p> : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left text-gray-700">#</th>
                <th className="border p-2 text-left text-gray-700">Name</th>
                <th className="border p-2 text-left text-gray-700">Email</th>
                <th className="border p-2 text-left text-gray-700">Age</th>
                <th className="border p-2 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map((user, index) => (
                <tr key={user._id} className="border hover:bg-gray-50 transition duration-300">
                  <td className="p-2 text-gray-700">{index + 1}</td>
                  <td className="p-2 text-gray-700">{user.name}</td>
                  <td className="p-2 text-gray-700">{user.email}</td>
                  <td className="p-2 text-gray-700">{user.age}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => setEditUser(user)} className="text-blue-500 hover:text-blue-700 transition duration-300"><FaEdit /></button>
                    <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:text-red-700 transition duration-300"><FaTrash /></button>
                  </td>
                </tr>
              )) : <tr><td colSpan="5" className="text-center py-4 text-gray-600">No users found</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Home;

