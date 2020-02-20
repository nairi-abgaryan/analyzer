import { ApiModelProperty } from '@nestjs/swagger';

export class DataResponse {
    @ApiModelProperty({
        isArray: true,
    })
    readonly data: [];

    @ApiModelProperty()
    readonly description: string;

  constructor(data: [], description: string) {
        this.data = data;
        this.description = description;
    }
}
