import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { authCredentialDTO } from "./dto/auth-credential.dto";
import { User } from "./users.entity";


@Injectable()
export class UserRepository extends Repository<User> {
    constructor (private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async getUserById(username: string): Promise<User> {
        return await this.findOne({where: {username}});
    }

    async createUser(authCredentialDTO: authCredentialDTO): Promise<void> {
        const {username, password} = authCredentialDTO;
        let user = this.create({username, password});
        try {
            await this.save(user);
        } catch (error) {
            if (error.errno === 1062) {
                throw new ConflictException('Existing username');
            }
            else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }
}