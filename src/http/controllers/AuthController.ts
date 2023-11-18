import { compare } from "bcryptjs";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { sign } from "jsonwebtoken";
import { User } from "../../database/entities/User";
import { ResponseUtil } from "../../utils/Response";
import { LoginDTO, RegisterDTO } from "../dtos/AuthDTO";

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        let userData = req.body;

        const dto = new RegisterDTO();
        Object.assign(dto, userData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(User);
        const user = repo.create(userData);

        await repo.save(user);

        return ResponseUtil.sendSuccessfulResponse<User[]>(
            res,
            "Successfully registered",
            user,
            null
        );
    }

    async login(req: Request, res: Response, next: NextFunction) {
        let { email, password } = req.body;

        const dto = new LoginDTO();
        dto.email = email;
        dto.password = password;
        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneBy({ email });
        if (!user) {
            return ResponseUtil.sendErrorResponse(res, "Invalid credentials", 401, null);
        }
        let passwordMatches = await compare(password, user.password);
        if (!passwordMatches) {
            return ResponseUtil.sendErrorResponse(res, "Invalid credentials", 401, null);
        }

        let accessToken = sign({ userId: user.id }, process.env.ACCESS_KEY_SECRET || "secret123", {
            expiresIn: "4h",
        });

        const returnUser = user.toResponse();

        return ResponseUtil.sendSuccessfulResponse(res, "User login success", { user: returnUser, accessToken });
    }
}
