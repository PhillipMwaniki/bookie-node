import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import { ResponseUtil } from "../../utils/Response";

export class AuthMiddleware {
    static async authenticate(req: Request, res: Response, next: NextFunction) {
        const { authorization: tokenHeader } = req.headers;
        if (!tokenHeader) {
            return ResponseUtil.sendErrorResponse(res, "Invalid access", 401, null);
        }

        const token = tokenHeader.split(" ")[1];

        try {
            const decoded = verify(token, process.env.ACCESS_KEY_SECRET || "secret123");

            // @ts-ignore
            const { userId: id } = decoded;

            const repo = AppDataSource.getRepository(User);

            // @ts-ignore
            req.user = await repo.findOneBy({ id });

        }catch (err) {
            console.error(err);
            return ResponseUtil.sendErrorResponse(res, "Invalid access", 401, null);
        }
        next();
    }
}
