// import React, { useContext } from 'react'
// import { ChatContext } from '../../contextApi/ChatCont'
// import { useState } from 'react'
// import { AuthContext } from '../../contextApi/AuthCont'
// import unreadNotificationsfunc from '../../utils/unreadNotifications'
// import moment from 'moment'

// const Notification = () => {
//  const {user}= useContext(AuthContext)
//  const {     userChats,
//   userChatsError,
//   isUserChatLoading,
//   potentialChats,
//   createChat,
//   currentChat,
//   updateCurrentChat,
//   message,
//   messageError,
//   ismessageLoading,
//   sendTextMessage,
//   OnlineUsers,
//   Notification,allUsers}= useContext(ChatContext)
// console.log('notifications ' ,Notification)
// const unreadNotifications=unreadNotificationsfunc(Notification)

// const modifiedNotifications=Notification.map((n)=>{
//   const sender= allUsers.find((user)=>user._id==n.senderId)
// return { ...n,
//   senderName:sender?.name
// }
// })
// console.log('unread noti', unreadNotifications )
// console.log('modified NOti', modifiedNotifications )
//  const [isOpen, setisOpen] = useState(false)


//     return (
//     <div className='niotifications'>
// <div className="notifications-icon" onClick={()=>{setisOpen(!isOpen)}}>
// <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
//   <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
// </svg>
// {
//   unreadNotifications?.length===0? null : (
//     <span className='notification-count '>
// <span>
//   {unreadNotifications?.length}
// </span>
//     </span>
//   )
// }
// </div>
// <div className="notifications-box mt-4 rounded-xl text-zinc-300">
//   {
//     isOpen  ? 
//      ( <div className="notifications-header " >
//         <h3 >Notification</h3>
//         <div className='mark-as-read'>
//             Mark all as read
//         </div> 
//         {modifiedNotifications?.length==0 ? <span>
//           No notifications yet..
//         </span> : null}
//         {modifiedNotifications && modifiedNotifications.map((n, index)=>{
//           return  <div key={index} className={n.isRead ? "notification bg-red-400" :"notification not-read " }>
// <span >{`${n.senderName} send you new messgage.`}</span>
// <span className='notification-time '>{moment(n.date).calendar()}</span>
//           </div>
//         })}
//     </div> ): null
//   }
// </div>
//     </div>
//   )
// }

// export default Notification
// // 