import React, { useContext, useEffect, useState } from "react";
import "../Login/Login.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../App";
import { Context } from "../../main";
import Loader from "../../components/Loader";

const Login = () => {
  const [logindata, setlogindata] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const { isAuthenticated, setisAuthenticated, reload, setreload } =
    useContext(Context);

  const handlechange = (e) => {
    setlogindata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get(server + "getProfile", { withCredentials: true })
      .then((response) => {
        response.data.success && setisAuthenticated(true);
        setreload(false);
      })
      .catch(() => {
        setisAuthenticated(false);
        setreload(false);
      });
  }, []);

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post(
        server + "login",
        {
          email: logindata.email,
          password: logindata.password,
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
    setlogindata({ email: "", password: "" });
  }

  if (isAuthenticated) {
    return navigate("/");
  }

  if (reload) {
    return <Loader/>;
  }

  return (
    <>
      <div className="login">
        <form className="loginform" onSubmit={handlesubmit} method="post">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={logindata.email}
            name="email"
            placeholder="Enter email..."
            onChange={(e) => handlechange(e)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={logindata.password}
            name="password"
            placeholder="Enter Password..."
            onChange={(e) => handlechange(e)}
          />
          <button type="submit">Login</button>
          <p>
            Don't have a account? <Link to={"/register"}>Register</Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
