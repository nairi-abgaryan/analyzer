import { ApiModelProperty } from '@nestjs/swagger';
import { UserResponse } from './UserResponse';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { AbstractDto } from '../../../common/dto/AbstractDto';

export class UsersPageResponse {
    @ApiModelProperty({
        type: UserResponse,
        isArray: true,
    })
    readonly data: AbstractDto[];

    @ApiModelProperty()
    readonly meta: PageMetaDto;

  constructor(data: UserResponse[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
