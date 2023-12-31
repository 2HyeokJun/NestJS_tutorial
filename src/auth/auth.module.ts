import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './users.service';
import { UserRepository } from './users.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt',}),
        JwtModule.register({
            secret: 'tutorial_secret',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
