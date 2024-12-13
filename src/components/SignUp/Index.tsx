import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const Index = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    Email: "",
    password: "",
    confirm_pass: "",
    first_name: "",
    last_name: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (
      (name === "password" && value === data.confirm_pass) ||
      (name === "confirm_pass" && value === data.password)
    ) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!passwordsMatch) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const response = await axios.post(`${apiUrl}/submit`, data);
  
      if (response.status === 201) {
        alert(response.data.message);
        setData({
          Email: "",
          password: "",
          confirm_pass: "",
          first_name: "",
          last_name: "",
        });
        setPasswordsMatch(false);
        navigate("/");
      } else if (response.status === 400) {
        alert("Email already exists. Please use a different email.");
      } else {
        alert("Error submitting form.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
  
      if (!error.response) {
        alert('Network error. Please check your internet connection and try again.');
      } else {
        alert('Email already exists. Please use a different email.');
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
  <form
    onSubmit={handleSubmit}
    className="max-w-md w-full  bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 h-full"
  >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="Email"
            id="floating_email"
            value={data.Email}
            onChange={(e) => setData({ ...data, Email: e.target.value })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handlePasswordChange}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="confirm_pass"
            value={data.confirm_pass}
            onChange={handlePasswordChange}
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={passwordsMatch}
              readOnly
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Passwords match
            </span>
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="first_name"
              value={data.first_name}
              onChange={(e) => setData({ ...data, first_name: e.target.value })}
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="last_name"
              value={data.last_name}
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/" className="text-blue-600">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Index;
