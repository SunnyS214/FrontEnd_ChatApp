// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Stack, Container } from 'react-bootstrap';
// import moment from 'moment';
// import InputEmoji from 'react-input-emoji';
// import { ChatContext } from '../../contextApi/ChatCont';
// import { AuthContext } from '../../contextApi/AuthCont';
// import useFetchRecipientUser from '../../hooks/UserFetchRecipient';
// import './ChatBox.css'
// // import './ChatBox.css'; // custom styles (create this)

// const ChatBox = () => {
//   const [textMessage, settextMessage] = useState('');

//   const { user } = useContext(AuthContext);
//   const {
//     currentChat,
//     message,
//     ismessageLoading,
//     sendTextMessage
//   } = useContext(ChatContext);

//   //auto scroll down to new messge coming
//   const scroll = useRef()
//   useEffect(()=>{
// scroll.current?.scrollIntoView({behavior:"smooth"})
//   },[message])
  

// // console.log( 'send message:' ,sendTextMessage)
//   const { recipientUser } = useFetchRecipientUser(currentChat, user);

//   if (!recipientUser) {
//     return (
//       <div style={{ textAlign: 'center', width: '100%' }}>
//         No Conversation selected yet..
//       </div>
//     );
//   }
  
//   if (ismessageLoading) {
//     return (
//       <div style={{ textAlign: 'center', width: '100%' }}>
//         Loading Chat...
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container w-[50vw] h-[65vh] rounded-xl bg-zinc-600">
//       <div className="chat-header  ">
//         <strong>{recipientUser?.name}</strong>
//       </div>

//       <div className="chat-messages overflow-y-scroll scrollbar-hidden">
//         {message &&
//           message.map((msg, index) => (
//             <div
//               key={index}
//               className={`message-bubble ${
//                 msg?.senderId === user?._id ? 'own' : ''
//               }`}
//               ref={scroll}
//             >
//               <span>{msg.text}</span>
//               <div className="message-time">
//                 {moment(msg.createdAt).calendar()}
//               </div>
//             </div>
//           ))}
//       </div>

//       <div className="chat-input-box">
//         <InputEmoji
//           value={textMessage}
//           onChange={settextMessage}
//           fontFamily="nunito"
//           borderColor="rgba(72,112,223,0.2)"
//           placeholder="Type a message..."
//         />
//         <button className="send-btn" onClick={()=> sendTextMessage(textMessage , user , currentChat._id, settextMessage)}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             fill="white"
//             viewBox="0 0 16 16"
//           >
//             <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
