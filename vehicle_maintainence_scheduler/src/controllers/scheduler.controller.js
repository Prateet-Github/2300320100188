import axios from "axios";
import dotenv from "dotenv";
import { solveKnapsack } from "../utils/knapsack.js";
import { Log } from "../../../logging_middleware/dist/index.js";

dotenv.config();

const safeLog = async (...args) => {
  try {
    await Log(...args);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

const getSchedule = async (req, res) => {
  try {
    const token = process.env.ACCESS_TOKEN;

    await safeLog(
      "backend",
      "info",
      "controller",
      "Fetching depots"
    );

    const depotsResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await safeLog(
      "backend",
      "info",
      "controller",
      "Fetching vehicles"
    );

    const vehiclesResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const depots = depotsResponse.data.depots;
    const vehicles = vehiclesResponse.data.vehicles;

    const schedules = depots.map((depot) => {
      const result = solveKnapsack(
        vehicles,
        depot.MechanicHours
      );

      return {
        depotId: depot.ID,
        mechanicHours: depot.MechanicHours,
        totalImpact: result.totalImpact,
        totalDuration: result.totalDuration,
        selectedTaskCount: result.selectedTasks.length,
      };
    });

    await safeLog(
      "backend",
      "info",
      "service",
      `Generated schedules for ${depots.length} depots`
    );

    return res.status(200).json({
      schedules,
    });
  } catch (error) {
    await safeLog(
      "backend",
      "error",
      "controller",
      error.message
    );

    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch data",
    });
  }
};

export { getSchedule };