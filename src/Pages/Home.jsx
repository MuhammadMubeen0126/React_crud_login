import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 

function Home() {
  const [users, setUser] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Fetch data from the server
  const fetchData = async () => {
    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/users",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status === 200) {
      setUser(response.data);
    }
  };

  // Fetch users on initial render
  useEffect(() => {
    fetchData();
  }, []);

  // Set initial form values if editing a user
  useEffect(() => {
    if (editUser) {
      setEditUser(editUser);
    }
  }, [editUser]);

  // Save new user
  const saveUser = async (values) => {
    const response = await axios.post("http://localhost:6000/user", {
      name: values.name,
      email: values.email,
      age: values.age,
    });
    if (response.status === 200) {
      alert("Data saved");
      fetchData();
      setUser(null);
    } else {
      alert("Data not saved");
    }
  };

  // Update existing user
  const updateUser = async (values) => {
    const response = await axios.put(`http://localhost:6000/user/${editUser._id}`, {
      name: values.name,
      email: values.email,
      age: values.age,
    });
    if (response.status === 200) {
      alert("Data updated");
      fetchData();
      setEditUser(null);
    } else {
      alert("Data not updated");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    const response = await axios.delete(`http://localhost:6000/user/${id}`);
    if (response.status === 200) {
      alert("User deleted");
      fetchData();
    }
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    age: Yup.number()
      .positive("Age must be a positive number")
      .required("Age is required"),
  });

  return (
    <div className="App">
<Formik
  initialValues={{
    name: editUser ? editUser.name : '',
    email: editUser ? editUser.email : '',
    age: editUser ? editUser.age : '',
  }}
  enableReinitialize={true}  
  validationSchema={validationSchema}
  onSubmit={async (values, { resetForm }) => {
    if (editUser) {
      await updateUser(values);  
    } else {
      await saveUser(values); 
    }
    resetForm();   
    setUser(null)
    setEditUser(null); 
  }}
>
        {({ isSubmitting }) => (
          <Form className="max-w-sm mx-auto">
            <h1 className="font-bold text-xl mt-4 mb-4">
              {editUser ? `Edit User: ${editUser.name}` : "Create User"}
            </h1>

            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your name
              </label>
              <Field
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <Field
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            <div className="mb-5">
              <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your age
              </label>
              <Field
                type="number"
                name="age"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Age"
              />
              <ErrorMessage name="age" component="div" style={{ color: 'red' }} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {editUser ? "Update" : "Create"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="relative overflow-x-auto mt-10">
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
            {users.length ? (
              users.map((user, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4 flex space-x-2 cursor-pointer">
                    <FaEdit onClick={() => setEditUser(user)} />
                    <FaTrash color="red" onClick={() => deleteUser(user._id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">Loading...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;