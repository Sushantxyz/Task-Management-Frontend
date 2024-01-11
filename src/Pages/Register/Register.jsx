import React, { useContext, useEffect, useState } from "react";
import "../Register/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { server } from "../../App";
import { Context } from "../../main";

const Register = () => {
  const navigate = useNavigate();

  const { isAuthenticated, setisAuthenticated } = useContext(Context);

  if (isAuthenticated) {
    return navigate("/");
  }

  const [registerdata, setregisterdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setregisterdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post(
        import.meta.env.VITE_SERVER + "register",
        {
          username: registerdata.username,
          email: registerdata.email,
          password: registerdata.password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setisAuthenticated(true);
        navigate("/");
      })
      .catch((error) => {
        setisAuthenticated(false);
      });
  }

  return (
    <div className="Register">
      <form className="Registerform" onSubmit={handlesubmit} method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username..."
          onChange={handlechange}
          name="username"
          value={registerdata.username}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email..."
          onChange={handlechange}
          name="email"
          value={registerdata.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password..."
          onChange={handlechange}
          name="password"
          value={registerdata.password}
        />
        <button>Register</button>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
