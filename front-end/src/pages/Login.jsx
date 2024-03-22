import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login({ loggedInUser }) {
  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const { data: res } = await axios.post("/api/v1/users/login", formData);
      if (res) {
        // navigation("/");
        toast(res.message);
        console.log(res.message);
        loggedInUser(res.data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-[black]">LogIn</h1>
      <div className="max-w-[456px] w-full flex flex-col gap-[17px]">
        {/* Input fields */}
        {[
          { label: "Email", name: "email", type: "text" },
          { label: "Password", name: "password", type: "password" },
        ].map((field) => (
          <div key={field.name}>
            <div className="text-[13px] font-[500] leading-[16px] pl-[16px] text-[#E0E0FF99]  w-full">
              {field.label}
            </div>
            <div className="max-w-[456px] w-full mt-[8px]">
              <input
                type={field.type}
                name={field.name}
                className="bg-[#E0E0FF08] text-[#fff] text-[16px] leading-[28px] font-[500] max-w-[456px] w-full outline-none rounded-[12px] pl-[16px] py-[10px]"
                onChange={handleInputChange}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Button */}
      <div className="max-w-[456px] w-full flex justify-between items-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`bg-gradient-to-r from-[#00BBFF] to-[#4579F5] shrink-0 max-w-[176px] w-full  rounded-[12px] border-[1px] border-[#0E0F12] text-[#fff] font-[600] text-[16px]  justify-center flex px-[24] py-[12px]`}
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
