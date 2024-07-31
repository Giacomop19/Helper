import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const router = require ('./src/routes/route')
const cors = require("cors")
const app: Express = express();
dotenv.config();
app.use(express.json())
const port = process.env.PORT;

//Middleware
app.use(bodyParser.json())
app.use(cors())

//Routes
app.use('/api', router)

app.get("/", (req: Request, res: Response) => {
  res.send("Server working correct");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});