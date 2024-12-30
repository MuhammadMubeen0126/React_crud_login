import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
  
    const fetchData = async () => {
        const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5000/users",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUsers(response.data);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [users]);
  
    useEffect(() => {
      if (editUser) {
        setName(editUser.name);
        setEmail(editUser.email);
        setAge(editUser.age);
      }
    }, [editUser]);
  
    const saveUser = async (e) => {
      e.preventDefault();
      const response = await axios.post("http://localhost:5000/user", {
        name,
        email,
        age
      });
  
      if (response.status === 200) {
        alert("Data saved");
        setUsers([]);
        fetchData();
      } else {
        alert("Failed to save data");
      }
    };
  
    const updateUser = async (e) => {
      e.preventDefault();
      const response = await axios.put(`http://localhost:5000/user/${editUser._id}`, {
        name,
        email,
        age
      });
  
      if (response.status === 200) {
        alert("Data updated");
        setUsers([]);
        fetchData();
        setEditUser(null);
      } else {
        alert("Failed to update data");
      }
    };
  
    const deleteUser = async (id) => {
      const response = await axios.delete(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        alert("User deleted");
        setUsers([]);
        fetchData();
      }
    };
  
  return (
    <div className="App">
      <form onSubmit={editUser ? updateUser : saveUser} className="max-w-sm mx-auto">
        <h1 className='font-bold text-xl mt-4 mb-4'>
          {editUser ? `Edit User: ${editUser.name}` : "Create User"}
        </h1>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {editUser ? "Update" : "Create"}
        </button>
      </form>

      <div className="relative overflow-x-auto mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Age</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user, index) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.age}</td>
                <td className="px-6 py-4 flex space-x-2 cursor-pointer">
                  <FaEdit onClick={() => setEditUser(user)} />
                  <FaTrash color="red" onClick={() => deleteUser(user._id)} />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home