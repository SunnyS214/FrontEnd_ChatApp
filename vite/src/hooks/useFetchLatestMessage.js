import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../contextApi/ChatCont'
import { baseURL, getReq } from '../utils/services'

const useFetchLatestMessage = (chat) => {
  const {message, Notification}=useContext(ChatContext)
  const [LatestMessage, setLatestMessage] = useState(null)
  useEffect(()=>{
      const getMessages = async () => {
   
         
         const response = await getReq(`${baseURL}/messages/${chat?._id}`);
   
         if (response.error) {
           return console.log("Error getting Message..." ,error);
         }
   
const lastMessage= response[response?.length-1]
setLatestMessage(lastMessage)
   
       };
       getMessages()
  },[message , Notification])
  
  return (
    {LatestMessage}
  )
}

export default useFetchLatestMessage
