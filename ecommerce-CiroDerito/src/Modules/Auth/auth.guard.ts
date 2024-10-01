import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) throw new BadRequestException('Token is required');

        try {
            const secret = process.env.JWT_SECRET;
            const payload = this.jwtService.verify(token, { secret });

            payload.exp = new Date(payload.exp * 1000);
            payload.iat = new Date(payload.iat * 1000);


            const roles = payload.isAdmin ? ['admin'] : ['user'];
            request.user = { ...payload, roles };
            
            // console.log('User authenticated:', request.user);
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }
}
