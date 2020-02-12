import { ApiModelProperty } from '@nestjs/swagger';
import { TokenResponse } from './TokenResponse';
import { UserResponse } from '../../user/models/UserResponse';

export class LoginResponse {
    @ApiModelProperty({ type: UserResponse })
    user: UserResponse;
    @ApiModelProperty({ type: TokenResponse })
    token: TokenResponse;

    constructor(user: UserResponse, token: TokenResponse) {
        this.user = user;
        this.token = token;
    }
}
