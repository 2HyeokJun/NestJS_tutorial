import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authCredentialDTO } from './dto/auth-credential.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository
    ) {}

    async signUp(authCredentialDTO: authCredentialDTO): Promise<void> {
        return await this.userRepository.createUser(authCredentialDTO);
    }

}
