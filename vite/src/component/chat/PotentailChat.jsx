import React, { useContext } from 'react';
import { ChatContext } from '../../contextApi/ChatCont';
import { AuthContext } from '../../contextApi/AuthCont';

const PotentialChat = () => {
  const {user} = useContext(AuthContext)
  
  const { potentialChats , createChat,OnlineUsers } = useContext(ChatContext);

  // console.log("potenatail chart Online users:", OnlineUsers);

  return (
    <div className="p-4">
      <div className="all-users space-y-2">
        {potentialChats && potentialChats.length > 0 ? (
          potentialChats.map((u ,index) => (
            <div className="single-user flex items-center justify-between p-2 border rounded"    onClick={()=>createChat(user._id , u._id)} key={index}  >
              <span>{u.name}</span>
              <span className={OnlineUsers?.some((user)=> user?.userId === u?._id) ?
                "user-online bg-green-400 w-2 h-2 rounded-full" :"" }></span>
            </div>
          ))
        ) : (
          <p>No users available to chat.</p>
        )}
      </div>
    </div>
  );
};

export default PotentialChat;
