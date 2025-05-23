import React, { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthCont, { AuthContext } from "../contextApi/AuthCont";
import Notification from "./chat/Notification";
// import {Link} from 'react-router-dom'
const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  // console.log("navbar", user);
  return (
    <>
      <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
          <h2>
            <Link to="/" className="link-light text-decoration-none ">
              Chat-App
            </Link>
          </h2>
          {user && (
            <span className="text-warning">Logged In as {user?.name}</span>
          )}

          <Nav>
            <Stack direction="horizontal" gap={3}>
              {user && (
                <>
                <Notification/>
                  <Link
                    onClick={() => {
                      logoutUser();
                    }}
                    to="/login"
                    className="link-light text-decoration-none "
                  >
                    Logout
                  </Link>
                </>
              )}

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="link-light text-decoration-none "
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="link-light text-decoration-none "
                  >
                    Register
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
