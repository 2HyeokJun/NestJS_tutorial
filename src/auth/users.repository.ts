import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { authCredentialDTO } from "./dto/auth-credential.dto";
import { User } from "./users.entity";


@Injectable()
export class UserRepository extends Repository<User> {
    async getUserById(username: string): Promise<User> {
        return await this.findOne({where: {username}});
    }

    async createUser(authCredentialDTO: authCredentialDTO): Promise<void> {
        const {username, password} = authCredentialDTO;
        let user = this.create({username, password});
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            }
            else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }
}