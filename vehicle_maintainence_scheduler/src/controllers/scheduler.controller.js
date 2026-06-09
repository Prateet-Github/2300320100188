import axios from "axios";
import dotenv from "dotenv";
import { solveKnapsack } from "../utils/knapsack.js";

dotenv.config();

const getSchedule = async (req, res) => {
  try {
    const token = process.env.ACCESS_TOKEN;

    const depotsResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const vehiclesResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const depots = depotsResponse.data.depots;
    const vehicles = vehiclesResponse.data.vehicles;

    console.log("Depots:", depots);

    const schedules = depots.map((depot) => {
      const result = solveKnapsack(vehicles, depot.MechanicHours);

      return {
        depotId: depot.ID,
        mechanicHours: depot.MechanicHours,
        totalImpact: result.totalImpact,
        totalDuration: result.totalDuration,
        selectedTaskCount: result.selectedTasks.length,
      };
    });

    console.log("Schedules:", schedules);

    return res.status(200).json({
      schedules,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      message: "Failed to fetch data",
    });
  }
};

export { getSchedule };
