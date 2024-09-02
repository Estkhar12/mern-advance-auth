import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDB.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();

const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); //allow us to parse incoming requerst : req.body
app.use(cookieParser()); // allow to parse incoming cookie

app.use("/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDb();
  console.log(`server is running on ${port}...`);
});
