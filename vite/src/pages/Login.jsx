import React, { useContext } from "react";
import { Alert, Button, Form, Row, Stack, Col } from "react-bootstrap";
import { AuthContext } from "../contextApi/AuthCont";
const Login = () => {
  const { loginUser, loginInfo, loginError, loginLoading, updateLogInInfo } =
    useContext(AuthContext);
  console.log();
  return (
    <div>
      <Form   onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login </h2>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateLogInInfo({ ...loginInfo, email: e.target.value })
                }
              
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLogInInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
              {loginLoading ? "Login Process.." : 'Log In'}
              </Button>

                {loginError?.error && <Alert>
                             <p>{loginError?.message}</p>
                           </Alert>
                           }
            </Stack>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
