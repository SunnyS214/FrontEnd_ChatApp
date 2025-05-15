import React from 'react'

const unreadNotificationsfunc = (notifications) => {
  return notifications.filter((n)=>n.isRead===false)
}

export default unreadNotificationsfunc
