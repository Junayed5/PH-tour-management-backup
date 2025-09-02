import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./config/env";

let server: Server;


const startServer = async () => {
  console.log(envVars.NODE_ENV)
  try {
    await mongoose.connect(
      "mongodb+srv://mongo-juna:mongodb@cluster0.8ujknfb.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("connecting to DB");

    server = app.listen(5000, () => {
      console.log("Server is listening port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

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
