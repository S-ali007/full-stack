import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser, FiMail, FiLock } from "react-icons/fi"; // Example: Icons from react-icons library

function Signup({ loggedInUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigation = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data: res } = await axios.post(
        "/api/v1/users/register",
        formData
      );
      if (res) {
        toast.success(res.message);
        loggedInUser(res.request.response);
        // navigation("/");
      }
    } catch (error) {
      toast.error("Email Already Exist");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-500 to-purple-600 mx-auto w-full">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-8">Sign Up</h1>
        <div className="flex flex-col gap-4">
          {/* Input fields */}
          {[
            {
              label: "First Name",
              name: "firstName",
              type: "text",
              icon: <FiUser />,
            },
            {
              label: "Last Name",
              name: "lastName",
              type: "text",
              icon: <FiUser />,
            },
            { label: "Email", name: "email", type: "email", icon: <FiMail /> },
            {
              label: "Password",
              name: "password",
              type: "password",
              icon: <FiLock />,
            },
          ].map((field) => (
            <div key={field.name}>
              <div className="flex items-center bg-gray-100 rounded-lg p-2">
                <div className="mr-4 text-gray-600">{field.icon}</div>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  className="bg-transparent text-gray-800 text-lg flex-1 focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold py-3 px-6 rounded-lg w-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-4"
        >
          Sign Up
        </button>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default Signup;
