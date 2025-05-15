import React, { useContext, useRef, useState } from 'react'
import ChatCont, { ChatContext } from '../../contextApi/ChatCont'
import { AuthContext } from '../../contextApi/AuthCont'
import { Stack ,Container } from 'react-bootstrap'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'
import useFetchRecipientUser from '../../hooks/UserFetchRecipient'




const ChatBox = () => {
    const [textMessage, settextMessage] = useState('')
const {user}=useContext(AuthContext)
console.log("text",textMessage)


const{   userChats,
    userChatsError,
    isUserChatLoading,
    potentialChats,
    createChat,
    currentChat,
    updateCurrentChat,
    message,
    messageError,
    ismessageLoading,}= useContext(ChatContext)
   

    const{recipientUser}= useFetchRecipientUser(currentChat,user)
if (!recipientUser) {
    return <p style={{textAlign: "center" , width:"100%"}}>
        No Conversation setlected yet..
    </p>
}

if (ismessageLoading) {
    return <p style={{textAlign: "center" , width:"100%"}}>
      Loading Chat...
    </p>
}
    // console.log('RecipoietnaUser' , recipientUser)    
    // console.log('CurrentChat' , currentChat)    
    return (
<Stack gap={4} className='chat-box'>
<div className="chat-header">
    <strong>{recipientUser?.name}</strong>
</div>
<Stack gap={3} className='messages'>
{message && message.map((msg,index)=>{
    return(
        <Stack key={index} className='`${msg?.senderId=== user?._Id} ? " message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0" '>
            <span>{msg.text}</span>
            <span className='message-footer'>{moment(msg.createdAt).calendar()}</span>
        </Stack>
    )
})}
</Stack>

<Stack direction='horizontal' gap={4} className='chat-input flex-grow-0' >
<InputEmoji value={textMessage} onChange={settextMessage} fontFamily='nunito' borderColor='rgba(72,112,223,0.2)'  />
<button className='send-btn '>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
</svg>
</button>
</Stack>
</Stack>
  )
}

export default ChatBox

