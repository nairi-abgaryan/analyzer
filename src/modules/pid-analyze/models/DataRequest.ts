import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DataRequest {
    @IsString()
    @ApiModelProperty()
    readonly data: string;
}
