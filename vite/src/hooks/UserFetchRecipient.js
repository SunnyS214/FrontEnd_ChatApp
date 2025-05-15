// import { useEffect, useState } from "react";

// import React from "react";
// import { baseURL, getReq } from "../utils/services";

// const UserFetchRecipientUser = (chat, user) => {
//   const [recipientUser, setrecipientUser] = useState(null);
//   const [error, seterror] = useState(null);
//   const recipientId = chat?.members.find((id) => id !== user?._id);
//   useEffect(() => {
//     const getUser = async () => {
//       if (!recipientId) return null;
//       const responce = await getReq(`${baseURL}/users/find/${recipientId}`);

//       if (responce.error) {
//         seterror(responce);
//       }

//       setrecipientUser(user);
//     };
//     getUser();
//   }, []);
//   return {recipientUser , error}
// };

// export default UserFetchRecipientUser;

















import { useEffect, useState } from "react";
import { baseURL, getReq } from "../utils/services";

// 🔽 Custom Hook ka sahi naam 'use' se shuru hota hai
const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);  // 👉 Yahaan API se aayi user info store hogi
  const [error, setError] = useState(null);  // 👉 Agar koi error aaye toh yahaan store hoga

  useEffect(() => {
    const getUser = async () => {
      if (!chat || !user) return;  // 👈 Agar chat ya user hi nahi hai toh function return kar do

      const recipientId = chat?.members?.find((id) => id !== user?._id);  
      // 👆 Chat members mein se jo dusra user hai uska ID nikaala ja raha hai (jo logged in user nahi hai)

      if (!recipientId) return;

      const response = await getReq(`${baseURL}/users/find/${recipientId}`);
      // 👆 API call ki ja rahi hai recipient user ka data lene ke liye

      if (response.error) {
        setError(response.error);  // 👈 Agar response mein error aayi toh use set karo
      } else {
        setRecipientUser(response);  // 👈 Agar sab sahi hai toh user data ko store karo
      }
    };

    getUser();  // 👈 useEffect ke andar function run kar rahe hain
  }, [chat, user]);  // 👈 Ye dependencies hain: jab chat ya user change ho toh dobara run hoga

  return { recipientUser, error };  // 👈 Hook use karne par yeh do cheezein milengi
};

export default useFetchRecipientUser;
