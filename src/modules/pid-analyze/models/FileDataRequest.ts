import { ApiModelProperty } from '@nestjs/swagger';

export class FileDataRequest {
    @ApiModelProperty()
    readonly data: File;
}
