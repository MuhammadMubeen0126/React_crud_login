import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';

const Register = ({ editUser, onSubmit }) => {
  // Initial values for Formik
  const initialValues = {
    name: editUser ? editUser.name : '',
    email: editUser ? editUser.email : '',
    age: editUser ? editUser.age : ''
  };

  // Simple validation (can be expanded)
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.age) {
      errors.age = 'Age is required';
    } else if (values.age < 18) {
      errors.age = 'Age must be at least 18';
    }
    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit} // this will be a function passed as a prop to handle form submission
      >
        {({ isSubmitting }) => (
          <Form className="max-w-sm mx-auto">
            <h1 className="font-bold text-xl mt-4 mb-4">
              {editUser ? `Edit User: ${editUser.name}` : "Create User"}
            </h1>

            {/* Form Fields */}
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
    </div>
  );
};

export default Register;
