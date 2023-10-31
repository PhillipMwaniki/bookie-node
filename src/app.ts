import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authorsRoute from './routes/authors';
import { EntityNotFoundError } from "typeorm";
import { ResponseUtil } from "../utils/Response";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/authors", authorsRoute);

app.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
        success: false,
        message: "Resource not found"
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof EntityNotFoundError) {
        return ResponseUtil.sendErrorResponse(res, "Resource not found", 404, null);
    }

    return res.status(500).send({
        success: false,
        message: "Something went wrong"
    })
});

export default app;
