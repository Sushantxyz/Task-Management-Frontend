import Header from "./components/Header/Header.jsx";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import { Context } from "./main.jsx";
// export const server = "http://localhost:3000/";

function App() {
  const { isAuthenticated } = useContext(Context);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {isAuthenticated ? (
            <Route path={"/*"} element={<Home />} />
          ) : (
            <>
              <Route path={"/register"} element={<Register />} />
              <Route path={"/*"} element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
