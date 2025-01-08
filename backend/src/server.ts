import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import './db/db';
import authRoutes from "./routes/authRoutes";
import cors from 'cors';

dotenv.config();

const server: Express = express();
const port = process.env.PORT || 3001;

server.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.use(cors());
server.use(express.json())
server.use('/api/auth', authRoutes)

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});