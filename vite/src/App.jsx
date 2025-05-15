import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Default from "./pages/Default";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Nav from "./component/NavBar";
import NavBar from "./component/NavBar";
import { AuthContext } from "./contextApi/AuthCont";
import ChatCont, { ChatContext } from "./contextApi/ChatCont";
function App() {
  const [count, setCount] = useState(0);
  const { user } = useContext(AuthContext);
// console.log(user?.name,'love')
  return (
    <ChatCont user={user}>
      <div className="min-w-screen  min-h-screen bg-zinc-700 ">
        <Container className="text-secondary ">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={user ? <Chat  /> : <Login />} />
              <Route element={user ? <Chat /> : <Login />} path="/login" />
              <Route
                element={user ? <Chat /> : <Register />}
                path="/register"
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </div>
    </ChatCont>
  );
}

export default App;
