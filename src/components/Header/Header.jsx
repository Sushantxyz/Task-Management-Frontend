import axios from "axios";
import React, { useContext } from "react";
// import { server } from "../../App";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import "../Header/Header.scss";

const Header = () => {
  const { isAuthenticated, setisAuthenticated, reload, setreload } =
    useContext(Context);

  const navigate = useNavigate();

  function handleDelete() {
    navigate("/");
    axios
      .post(import.meta.env.VITE_SERVER + "logout", {}, { withCredentials: true })
      .then((response) => {
        response.data.success && setisAuthenticated(false);
      });
  }

  return (
    <>
      <div className="Header">
        <h1>Task Management system</h1>
        {isAuthenticated && (
          <button onClick={(e) => handleDelete()}>Logout</button>
        )}
      </div>
    </>
  );
};

export default Header;
