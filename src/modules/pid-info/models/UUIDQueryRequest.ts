import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UUIDQueryRequest {
    @IsString()
    @ApiModelProperty()
    readonly infoUUIDs: string;
}
