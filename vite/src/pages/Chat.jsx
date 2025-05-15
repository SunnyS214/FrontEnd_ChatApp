import React, { useContext } from 'react'
import { ChatContext } from '../contextApi/ChatCont'
import { Stack ,Container } from 'react-bootstrap'
import UserChat from '../component/chat/UserChat'
import { AuthContext } from '../contextApi/AuthCont'
import PotentailChat from '../component/chat/PotentailChat'
import ChatBox from '../component/chat/ChatBox'

const Chat = () => {
  
  const{user}=useContext(AuthContext)
  // console.log('chat user' , user)
  const{userChats, updateCurrentChat, isuserChatLoading ,  message,
    messageError,
    ismessageLoading,}=useContext(ChatContext)
  // console.log('userChats :' , userChats)

  return (
    <Container >
      <PotentailChat/>
     {userChats?.length <1 ? null : (
      <Stack direction='horizontal' gap={4} className='align-items-start'  >
      <Stack  className='messages-box  flex-grow-0 pe-3 ' gap={3} >  
{isuserChatLoading && <p>Loading chats...</p> }
          {userChats?.map((chat , index)=>{
return (
  <div  key={index} onClick={()=>updateCurrentChat(chat)} >
    <UserChat chat={chat} user={user} />
    
  </div>
)
          }) }
          </Stack>
      <div className='text-white'>
<ChatBox/>

      </div>
      </Stack>)}
    </Container>
  )
}

export default Chat
