import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./users.entity";

export const getUser = createParamDecorator((data, context: ExecutionContext): User => {
    let req = context.switchToHttp().getRequest();
    return req.user;
})