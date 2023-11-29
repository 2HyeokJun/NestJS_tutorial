import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { authCredentialDTO } from "./dto/auth-credential.dto";
import { User } from "./users.entity";
import bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDTO: authCredentialDTO): Promise<void> {
        const {username, password} = authCredentialDTO;
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        let user = this.create({username, password}); // TODO:
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