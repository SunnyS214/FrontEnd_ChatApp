import React, { createContext, useCallback, useEffect } from "react";
import { useState } from "react";
import { baseURL, postReq } from "../utils/services";

export const AuthContext = createContext();
const AuthCont = ({ children }) => {
  const [user, setuser] = useState(null);
  const [registerError, setregisterError] = useState(null);
  const [isRegisterLoading, setisRegisterLoading] = useState(false);
  const [registerInfo, setregisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setloginError] = useState(null);
  const [loginLoading, setloginLoading] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  // console.log('Error : info', registerError)
  // console.log("error hia ya nahi hai', registerError)
  // console.log('user: ',user)
  console.log('LoginInfo: ',loginInfo)
  console.log('RegisterInfo: ',registerInfo)
  useEffect(() => {
    const user = localStorage.getItem("User");
    setuser(JSON.parse(user));
  }, []);

  const updateLogInInfo = useCallback((info) => {
    setloginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setisRegisterLoading(true);
      setregisterError(null);

      const response = await postReq(`${baseURL}/users/register`, registerInfo);
      setisRegisterLoading(false);

      if (response.error) {
        return setregisterError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setuser(response);
    },
    [registerInfo],
  );

  const updateRegisterInfo = useCallback((info) => {
    setregisterInfo(info);
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setloginLoading(true);
      setloginError(null);
      const response = await postReq(`${baseURL}/users/login`, loginInfo);
      setloginLoading(false);
      if (response.error) {
        return setloginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setuser(response);
    },
    [loginInfo],
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setuser(null);
  }, []);
  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          registerInfo,
          updateRegisterInfo,
          registerUser,
          registerError,
          isRegisterLoading,
          logoutUser,
          loginUser,
          loginInfo,
          loginError,
          loginLoading,
          updateLogInInfo,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthCont;
