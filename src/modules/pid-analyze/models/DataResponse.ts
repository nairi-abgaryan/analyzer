import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { DataEntity } from '../data.entity';
import { Info } from '../../pid-info/info.entity';

export class DataResponse extends AbstractDto {
    @ApiModelPropertyOptional()
    pid: string;

    @ApiModelPropertyOptional()
    info: Info;

    constructor(dataEntity: DataEntity) {
        super(dataEntity);
        this.pid = dataEntity.pid;
    }
}
