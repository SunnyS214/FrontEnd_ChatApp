import React, { useContext } from 'react'
import UserFetchRecipientUser from '../../hooks/UserFetchRecipient'
import { Container, Stack } from 'react-bootstrap'
import profile from "../../assets/profile.svg"
import { ChatContext } from '../../contextApi/ChatCont'
import unreadNotificationsfunc from '../../utils/unreadNotifications'
import useFetchLatestMessage from '../../hooks/useFetchLatestMessage'
import moment from 'moment'
const UserChat = ({chat ,user}) => {   

const {recipientUser}=UserFetchRecipientUser(chat,user)
const {OnlineUsers , Notification, markThisUserNotificationsAsRead} =useContext(ChatContext)
//   console.log("userChat Online users:", OnlineUsers);d
const unreadNotifications = unreadNotificationsfunc(Notification)
const {LatestMessage} = useFetchLatestMessage(chat)
console.log(LatestMessage)
 

//indivisual notifications for users
const thisUSerNotificationUser = unreadNotifications?.filter(n=> n.senderId===recipientUser?._id)

// console.log('userchat' , unreadNotifications)
  const isonline=OnlineUsers?.some((user)=> user?.userId === recipientUser?._id) 
    // console.log('recipient user',recipientUser)
    // console.log('user :' , user)

    const truncateText=(text)=>{
let shortText=text.substring(0,10)
if(text.length > 20){
    shortText=shortText+"..."
}
return shortText
    }
  return (
    <Stack direction='horizontal' gap={3} 
    className='user-card align-items-center p-2  justify-content-between'
     role='button' 
    onClick={()=>{
        if (thisUSerNotificationUser?.length!==0) {
            
            markThisUserNotificationsAsRead(thisUSerNotificationUser,Notification,)
        }
    }}
    >
        <div className="d-flex">
            <div className="me-2 text-white">
                <img src={profile} alt="" className='h-[40px]' />
            </div>
            <div className='text-content'>
                <div className="name text-white">
                    {recipientUser?.name}
                </div>
                <div className="text">
                 {LatestMessage?.text&&(
                    <span>
                        {truncateText(LatestMessage?.text)}
                    </span>
                 )}
                </div>

            </div>
        </div>
        <div className="d-flex flex-column align-items-end ">
<div className="date">
    {moment(LatestMessage?.createdAt).calendar()}
</div>
<div className={thisUSerNotificationUser?.length>0? "this-user-notifications":"" }>
    {thisUSerNotificationUser?.length> 0 ? thisUSerNotificationUser.length :""}
</div>
<span className={isonline?"user-online":""}></span>
        </div>
      
    </Stack>
  )
}

export default UserChat


