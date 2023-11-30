import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authCredentialDTO } from './dto/auth-credential.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialDTO: authCredentialDTO): Promise<void> {
        await this.hashPassword(authCredentialDTO);
        console.log('dto:', authCredentialDTO);
        return await this.userRepository.createUser(authCredentialDTO);
    }

    async signIn(authCredentialDTO: authCredentialDTO): Promise<{accessToken: string}> {
        const {username, password} = authCredentialDTO;
        let selectedUser = await this.userRepository.getUserById(username);
        if (selectedUser && await bcrypt.compare(password, selectedUser.password)) {
            let payload = {username};
            let accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        } else {
            throw new UnauthorizedException('login failed');
        }
    }

    async hashPassword(authCredentialDTO: authCredentialDTO): Promise<void> {
        let salt = await bcrypt.genSalt();
        await bcrypt.hash(authCredentialDTO.password, salt);
    }

}
