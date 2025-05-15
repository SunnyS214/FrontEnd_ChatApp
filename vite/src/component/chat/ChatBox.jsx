import React, { useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import { ChatContext } from '../../contextApi/ChatCont';
import { AuthContext } from '../../contextApi/AuthCont';
import useFetchRecipientUser from '../../hooks/UserFetchRecipient';

const ChatBox = () => {
  const [textMessage, settextMessage] = useState('');
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    message,
    ismessageLoading,
    sendTextMessage
  } = useContext(ChatContext);

  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  if (!recipientUser) {
    return (
      <div className="text-center text-white w-full mt-10">
        No Conversation selected yet..
      </div>
    );
  }

  if (ismessageLoading) {
    return (
      <div className="text-center text-white w-full mt-10">
        Loading Chat...
      </div>
    );
  }

  return (
    <div className="w-full md:w-[50vw] h-[70vh] flex flex-col bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-700 text-white font-medium text-base bg-zinc-900 flex items-center">
        {recipientUser?.name}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hidden">
        {message && message.map((msg, index) => {
          const isOwn = msg?.senderId === user?._id;
          return (
            <div
              key={index}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              ref={scroll}
            >
              <div className={`
                max-w-[75%] px-4 py-2 rounded-xl shadow 
                ${isOwn 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-zinc-700 text-zinc-200 rounded-bl-none'}
              `}>
                <p className="text-sm">{msg.text}</p>
                <div className="text-[10px] mt-1 text-right opacity-60">
                  {moment(msg.createdAt).format('LT')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Input */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-zinc-700 bg-zinc-900">
        <div className="flex-1">
          <InputEmoji
            value={textMessage}
            onChange={settextMessage}
            fontFamily="inherit"
            borderColor="transparent"
            placeholder="Type a message..."
            className="w-full bg-zinc-800 text-white rounded-lg text-sm"
          />
        </div>
        <button
          onClick={() => sendTextMessage(textMessage, user, currentChat._id, settextMessage)}
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-full p-2 shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855l-.452.18a.5.5 0 0 0-.082.887l.41.26 4.995 3.178 3.178 4.995.26.41a.5.5 0 0 0 .886-.083L14.13 2.576zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
