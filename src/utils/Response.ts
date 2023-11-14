import { Response } from "express";

export class ResponseUtil {
    static sendSuccessfulResponse<T>(res: Response, message: string = 'Resource Located', data: T, paginationInfo: any = null, statusCode = 200): Response<T> {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            paginationInfo
        });
    }

    static sendErrorResponse<T>(res: Response, message: string = 'Resource Located', statusCode = 500, error: T): Response<T> {
        return res.status(statusCode).json({
            success: false,
            message,
            error
        });
    }
}
