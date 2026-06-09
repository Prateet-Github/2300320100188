import axios from "axios";
import dotenv from "dotenv";
import { PRIORITY_MAP } from "../utils/priority.js";

dotenv.config();

const getNotifications = async (req, res) => {
  try {
    const token = process.env.ACCESS_TOKEN;

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const notifications = response.data.notifications;

    notifications.sort((a, b) => {
      return (
        PRIORITY_MAP[b.Type] -
        PRIORITY_MAP[a.Type]
      );
    });

    const formattedNotifications =
      notifications.map((notification) => ({
        ...notification,
        priority:
          PRIORITY_MAP[notification.Type],
      }));

    return res.status(200).json({
      count: formattedNotifications.length,
      notifications: formattedNotifications,
    });
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
};

export { getNotifications };