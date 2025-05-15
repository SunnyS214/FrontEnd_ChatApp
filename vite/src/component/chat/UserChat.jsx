import React, { useContext } from 'react'
import UserFetchRecipientUser from '../../hooks/UserFetchRecipient'
import profile from "../../assets/profile.svg"
import { ChatContext } from '../../contextApi/ChatCont'
import unreadNotificationsfunc from '../../utils/unreadNotifications'
import useFetchLatestMessage from '../../hooks/useFetchLatestMessage'
import moment from 'moment'

const UserChat = ({ chat, user }) => {
  const { recipientUser } = UserFetchRecipientUser(chat, user);
  const { OnlineUsers, Notification, markThisUserNotificationsAsRead } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsfunc(Notification);
  const { LatestMessage } = useFetchLatestMessage(chat);

  const thisUserNotifications = unreadNotifications?.filter(n => n.senderId === recipientUser?._id);
  const isOnline = OnlineUsers?.some((u) => u?.userId === recipientUser?._id);

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) shortText += "...";
    return shortText;
  };

  return (
    <div
      className="flex items-center justify-between p-3 hover:bg-zinc-800 transition-all duration-200 rounded-xl cursor-pointer bg-zinc-700 shadow-sm"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, Notification);
        }
      }}
    >
      {/* Left - Profile and Message */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={profile} alt="profile" className="w-12 h-12 rounded-full object-cover border border-white" />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div>
          <h4 className="text-white font-semibold">{recipientUser?.name}</h4>
          <p className="text-sm text-zinc-300">{truncateText(LatestMessage?.text || "No messages yet.")}</p>
        </div>
      </div>

      {/* Right - Time and Notification */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-zinc-400">
          {moment(LatestMessage?.createdAt).calendar()}
        </span>
        {thisUserNotifications?.length > 0 && (
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
            {thisUserNotifications.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserChat;
