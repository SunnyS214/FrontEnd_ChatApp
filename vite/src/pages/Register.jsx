import React, { useContext } from 'react'
import { Alert, Button, Form, Row, Stack, Col } from 'react-bootstrap'
import AuthCont, { AuthContext } from '../contextApi/AuthCont'
const Register = () => {

  const { registerInfo, updateRegisterInfo, registerUser, isRegisterLoading, registerError } = useContext(AuthContext)
  //  console.log(registerInfo ,updateRegisterInfo)
  return (
    <div >
      <Form onSubmit={registerUser}>
        <Row style={{
          height: '100vh',
          justifyContent: "center",
          paddingTop: "10%"
        }}>
          <Col xs={6}>
            <Stack gap={3} >
              <h2>Register</h2>
              <Form.Control type='text' placeholder='Name' onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
              <Form.Control type='email' placeholder='Email' onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
              <Form.Control type='password' placeholder='Password' onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
              <Button variant='primary' type='submit' >{isRegisterLoading ? "Creating you account.." : 'Register'} </Button>

              {registerError?.error && <Alert>
                <p>{registerError?.message}</p>
              </Alert>
              }

            </Stack>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Register
