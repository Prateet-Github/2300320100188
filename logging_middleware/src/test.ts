import { Log } from "./index";

async function main() {
  try {
    console.log("Testing logger...");

    await Log(
      "backend",
      "info",
      "service",
      "Logger initialized successfully"
    );

    console.log("Log sent successfully");
  } catch (error) {
    console.error("Logger test failed:", error);
  }
}

main();