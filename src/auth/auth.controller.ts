import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './users.service';
import { authCredentialDTO } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './get-user.decorator';
import { User } from './users.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDTO: authCredentialDTO): Promise<void> {
        return this.authService.signUp(authCredentialDTO);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDTO: authCredentialDTO): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDTO);
    }

    @Post('/authtest')
    @UseGuards(AuthGuard())
    test(@getUser() user: User) {
        return user;
    }
}
