import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { baseURL, getReq, postReq } from "../utils/services";
import {io} from 'socket.io-client'
export const ChatContext = createContext();

const ChatCont = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setmessage] = useState(null)
  const [ismessageLoading, setismessageLoading] = useState(null)
  const [messageError, setmessageError] = useState(null)
  // console.log('messages', message)
const [sendTextMessageError, setsendTextMessageError] = useState(null)
const [NewMessage, setNewMessage] = useState(null)
const [socket, setsocket] = useState(null)
const [OnlineUsers, setOnlineUsers] = useState([])
const [Notification, setNotification] = useState([]);
const [allUsers, setallUsers] = useState([])
// console.log('allusers :' , allUsers)



//initail socket
useEffect(()=>{
  const newSocket =io("http://localhost:4000")
  setsocket(newSocket)

return ()=>{
  newSocket.disconnect();
}

},[user])


//add online users
useEffect(()=>{
  if(socket === null) return
  socket.emit("addNewUser" , user?._id)
socket.on("getOnlineUsers" , (data)=>{
setOnlineUsers(data)
  // console.log('getounieusers are here', OnlineUsers)
})
return ()=>{
  socket.off("getOnlineUser")
}

},[socket])

//send message 
useEffect(()=>{
  if(socket === null) return
  const recipientId = currentChat?.members?.find((id) => id !== user?._id);  

socket.emit("sendMessage" , {...NewMessage, recipientId}) 

},[NewMessage])


//receive message and nofications
useEffect(()=>{
  if(socket === null) return
  socket.on("getMessage" , res=>{
if(currentChat?._id !== res.chatId) return 
setmessage((prev)=>[...prev , res])
  } )

  socket.on("getNotification" , (res)=>{
    const isChatOpen = currentChat?.members?.some(id => id === res.senderId);

  if (isChatOpen) {
    setNotification(prev=> [{...res , isRead:true}, ...prev])
  }else{
    setNotification(prev =>[res, ...prev])
  }
})

  return ()=>{
    socket.off("getMessage")
    socket.off("getNotification")
  }

},[socket , currentChat])



  useEffect(() => {
    const getPotentialChats = async () => {
      if (!user?._id) return;
     
      const response = await getReq(`${baseURL}/users`);
      if (response.error) {
        console.log("Error Fetching users", response);
        return;
      }

      const pChats = response.filter((e) => {
        if (user._id === e._id) return false;

        const isChatCreated = userChats?.some((chat) => {

          return chat.members.includes(e._id);
        });

        return !isChatCreated;
      });

      setPotentialChats(pChats);
      setallUsers(response)
    };

    getPotentialChats();
  }, [user, userChats]);


  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatLoading(true);
        setUserChatsError(null);
        const response = await getReq(`${baseURL}/chats/${user._id}`);
        setIsUserChatLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user, Notification]);


  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postReq(`${baseURL}/chats`, { firstId, secondId });

    // const response = await postReq(`${baseURL}/chats`, JSON.stringify({firstId,secondId}));
    if (response.error) {
      return console.log('error during creating chat', response)

    }
    setUserChats((prev) => [...prev, response])


  }, [])

  useEffect(() => {
    const getMessages = async () => {

      setismessageLoading(true);
      setmessageError(null);
      const response = await getReq(`${baseURL}/messages/${currentChat?._id}`);
      setismessageLoading(false);

      if (response.error) {
        return setmessageError(response);
      }

      setmessage(response);

    };
    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
    if (!textMessage) {
      return console.log('You must type something')
    }
    const response = await postReq(`${baseURL}/messages`, { chatId: currentChatId, senderId: sender._id, text: textMessage })
    if (response.error) {
      return sendTextMessageError(response);
    }

    setNewMessage(response)
    setmessage((prev)=>[...prev , response])
    setTextMessage("")
  }, [])

const markAllNotificationsRead =useCallback((nofications)=>{
const modiFNotifications =nofications.map((n)=> {
  return {...n , isRead:true}
})
setNotification(modiFNotifications)
},[])



const markNotificationsRead =useCallback((n, userchats , user,notifications )=>{
 //find to chat open

 const desiredChat = userchats.find((chat => {
  const chatMemebrs =[user._id, n.senderId]
  const isDesiredChat= chat?.members.every((member)=>{
    return chatMemebrs.includes(member)
  } )
  return isDesiredChat
 })
)

//mark notifications as read 
const mNotifications = notifications.map(el =>{
  if(n.senderId===el.senderId ){
    return {...n , isRead:true}
   }else{
    return el
   }


})
updateCurrentChat(desiredChat)
setNotification(mNotifications)
},[])

const markThisUserNotificationsAsRead = useCallback((thisUSerNotificationUser ,notifications) =>{
const modiFNotifications=notifications.map((el)=>{
  let notification;
  thisUSerNotificationUser.forEach(n=>{
    if(n.senderId===el.senderId){
      notification={...n , isRead:true}
    }else{
      notification=el
    }
  })
  return notification
})
setNotification(modiFNotifications)
} ,[])
  return (
    <ChatContext.Provider
      value={{
        userChats,
       
        userChatsError,
        isUserChatLoading,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        message,
        messageError,
        ismessageLoading,
        sendTextMessage,
        OnlineUsers,
        Notification,
        allUsers,
        markAllNotificationsRead,markNotificationsRead,
         markThisUserNotificationsAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatCont;






