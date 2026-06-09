import axios from "axios";
import dotenv from "dotenv";
import { PRIORITY_MAP } from "../utils/priority.js";
import { sendNotifications } from "../utils/scheduler.js";
import { Log } from "../../../logging_middleware/dist/index.js";

dotenv.config();

const safeLog = async (
  level,
  packageName,
  message
) => {
  try {
    await Log(
      "backend",
      level,
      packageName,
      message
    );
  } catch (_) {}
};

const getNotifications = async (req, res) => {
  try {
    const token = process.env.ACCESS_TOKEN;

    await safeLog(
      "info",
      "controller",
      "Fetching notifications"
    );

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const notifications =
      response.data.notifications;

    await safeLog(
      "info",
      "service",
      `Fetched ${notifications.length} notifications`
    );

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

    const sentNotifications =
      sendNotifications(
        formattedNotifications
      );

    await safeLog(
      "info",
      "service",
      `Processed ${sentNotifications.length} notifications`
    );

    return res.status(200).json({
      totalNotifications:
        sentNotifications.length,
      sentNotifications,
    });
  } catch (error) {
    await safeLog(
      "error",
      "controller",
      error.message
    );

    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
};

export { getNotifications };