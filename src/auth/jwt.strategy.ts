import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'secret_token',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepository.findOne({where: username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}