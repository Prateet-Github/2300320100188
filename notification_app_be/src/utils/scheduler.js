const sendNotifications = (notifications) => {
  const sentNotifications = [];

  notifications.forEach((notification) => {
    sentNotifications.push({
      id: notification.ID,
      type: notification.Type,
      message: notification.Message,
      priority: notification.priority,
      status: "sent",
      sentAt: new Date().toISOString(),
    });
  });

  return sentNotifications;
};

export { sendNotifications };