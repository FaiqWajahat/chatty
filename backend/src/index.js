// importing files here
import express from "express";
import { app, server } from "./lib/socket.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/message.js";
import dbConnection from "./lib/dbConnection.js";
import path from "path"
import env from "dotenv";

env.config();

const __dirname = path.resolve();

// using body-parser and cors here
app.use(express.json({ limit: '50mb' })); // Increase the limit to 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

// connecting to database here
dbConnection();



// setting up routes here
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
// setting up port

// listening to port here
server.listen(port, () => {
  console.log("Server is running on port" + port);
});
