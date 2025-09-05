/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/superAdmin";
let server: Server;


const startServer = async () => {
  // console.log(envVars.NODE_ENV)
  // console.log(envVars.NODE_ENV)
  // console.log(envVars.NODE_ENV)
  try {
    await mongoose.connect(
      envVars.DB_URL
    );

    console.log("connecting to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
seedSuperAdmin()

// Error Handling

// Error come from DB 

process.on("unhandledRejection", () => {
  console.log("Unhandled Rejection Detedted.. server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Promise.reject(new Error("Forgot error"))

process.on("uncaughtException", () => {
  console.log("Uncought Error.. server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// throw new Error("I forgot uncought")

// Error coming from hoisting server

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved.. server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
process.on("SIGINT", () => {
  console.log("SIGTERM signal recieved.. server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Some error handling

/**
 * Unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
