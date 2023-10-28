import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authorsRoute from './routes/authors';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/authors", authorsRoute);

export default app;
