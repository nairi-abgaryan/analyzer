import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserResponse } from '../user/models/UserResponse';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginRequest } from './models/LoginRequest';
import { LoginResponse } from './models/LoginResponse';
import { RegisterRequest } from './models/RegisterRequest';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginResponse,
        description: 'User info with access token',
    })
    async userLogin(
        @Body() userLoginDto: LoginRequest,
    ): Promise<LoginResponse> {
        const user = await this.authService.validateUser(userLoginDto);

        const token = await this.authService.createToken(user);
        return new LoginResponse(user, token);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserResponse,
        description: 'Successfully Registered',
    })
    async userRegister(
        @Body() userRegisterDto: RegisterRequest,
    ): Promise<UserResponse> {
        return this.userService.createUser(userRegisterDto);
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserResponse, description: 'current user info' })
    getCurrentUser(@AuthUser() user: UserEntity) {
        return user;
    }
}
