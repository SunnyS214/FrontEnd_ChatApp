import React, { useContext, useState } from 'react'
import { ChatContext } from '../../contextApi/ChatCont'
import { AuthContext } from '../../contextApi/AuthCont'
import unreadNotificationsfunc from '../../utils/unreadNotifications'
import moment from 'moment'

const Notification = () => {
  const { user } = useContext(AuthContext)
  const {
    userChats,
    Notification,
    allUsers,
    markAllNotificationsRead,markNotificationsRead
  } = useContext(ChatContext)

  const unreadNotifications = unreadNotificationsfunc(Notification)

  const modifiedNotifications = Notification.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId)
    return {
      ...n,
      senderName: sender?.name
    }
  })

  const [isOpen, setisOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      {/* Notification Icon */}
      <div
        className="relative cursor-pointer p-2 bg-zinc-700 rounded-full hover:bg-zinc-600 transition"
        onClick={() => setisOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
        </svg>
        {unreadNotifications?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadNotifications.length}
          </span>
        )}
      </div>

      {/* Notification Dropdown Box */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-zinc-800 text-white shadow-lg rounded-lg z-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button
              onClick={()=>markAllNotificationsRead(Notification)}
              className="text-sm text-blue-400 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {modifiedNotifications.length === 0 ? (
            <p className="text-sm text-gray-400">No notifications yet.</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600">
              {modifiedNotifications.map((n, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md ${
                    n.isRead ? 'bg-zinc-700' : 'bg-zinc-600'
                  } transition-all`}

                  onClick={()=>{markNotificationsRead(n, userChats , user, Notification ),
                    setisOpen(false) }
                  
                 }
                  
                >
                  <p className="text-sm font-medium">
                    {n.senderName} sent you a message
                  </p>
                  <p className="text-xs text-gray-400">
                    {moment(n.date).calendar()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Notification
