import axios from "axios";
import dotenv from "dotenv";

import { LOG_API_URL } from "../config/constants";
import {
  Stack,
  Level,
  BackendPackage,
} from "../types/logger.types";

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error("ACCESS_TOKEN is missing");
}

export async function Log(
  stack: Stack,
  level: Level,
  packageName: BackendPackage,
  message: string
): Promise<void> {
  try {
    // console.log("LOGGER TOKEN:", process.env.ACCESS_TOKEN?.slice(0, 30));
    await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Failed to create log:", error);
    throw error;
  }
}