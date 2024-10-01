import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const currentDataTime = new Date().toISOString();
        console.log(`Se esta ejecuntando el metodo ${req.method} en la ruta ${req.url} con data de: ${currentDataTime}`);

        next();
    }
}

export const globalLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date()
    const currentData = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    console.log(`Se esta ejecuntando el metodo ${req.method} en la ruta ${req.url} el dia: ${currentData} a las : ${time}`);

    next();
}
