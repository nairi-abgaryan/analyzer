import { ApiModelProperty } from '@nestjs/swagger';

export class TokenResponse {
    @ApiModelProperty()
    expiresIn: number;

    @ApiModelProperty()
    accessToken: string;

    constructor(data: { expiresIn: number; accessToken: string }) {
        this.expiresIn = data.expiresIn;
        this.accessToken = data.accessToken;
    }
}
