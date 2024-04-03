import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = inpval;

    if (firstName === "") {
      toast.warning("First Name is required!", {
        position: "top-center",
      });
    } else if (lastName === "") {
      toast.error("last Name is required!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("Email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("Password must be 6 char!", {
        position: "top-center",
      });
    } else {
      try {
        const { data: res } = await axios.post(
          "/api/v1/users/register",
          inpval
        );
        if (res) {
          toast.success(res.message);
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.firstName}
                name="firstName"
                id="firstName"
                placeholder="Enter Your First Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.lastName}
                name="lastName"
                id="lastName"
                placeholder="Enter Your Last Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={addUserdata}>
              Sign Up
            </button>
            <p>
              Already have an account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Register;
