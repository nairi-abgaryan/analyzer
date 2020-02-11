import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { ContextService } from '../../providers/context.service';
import { HashService } from '../../providers/hash.service';
import { Mapper } from '../../providers/mapper.service';
import { ConfigService } from '../../shared/services/config.service';
import { UserResponse } from '../user/models/UserResponse';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginRequest } from './models/LoginRequest';
import { TokenResponse } from './models/TokenResponse';

@Injectable()
export class AuthService {
    private static authUserKey = 'user_key';

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,
    ) {}

    async createToken(user: UserEntity | UserResponse): Promise<TokenResponse> {
        return new TokenResponse({
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({ id: user.id }),
        });
    }

    async validateUser(userLoginDto: LoginRequest): Promise<UserResponse> {
        const user = await this.userService.findOne({
            email: userLoginDto.email,
        });
        const isPasswordValid = await HashService.validateHash(
            userLoginDto.password,
            user && user.password,
        );
        if (!user || !isPasswordValid) {
            throw new UserNotFoundException();
        }

        return Mapper.map(UserResponse, user);
    }

    static setAuthUser(user: UserEntity) {
        ContextService.set(AuthService.authUserKey, user);
    }

    static getAuthUser(): UserEntity {
        return ContextService.get(AuthService.authUserKey);
    }
}
