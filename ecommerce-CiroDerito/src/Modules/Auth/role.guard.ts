import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        //usado para depurar los datos que llegan del user
        // console.log('Required roles:', requiredRoles);
        // console.log('User roles:', user?.roles);
        if (!user) {
            throw new ForbiddenException('No user found');
        }


        const hasRole = () => requiredRoles.some(role => user.roles.includes(role));

        if (!hasRole()) {
            throw new ForbiddenException('You do not have permission to access this content');
        }

        return true;
    }
}
