import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { OperationTypes } from '../../../utils/enums';
import { Info } from '../info.entity';

export class InfoResponse {
    @IsString()
    @ApiModelProperty()
    readonly pid: string;

    @IsString()
    @ApiModelProperty()
    readonly description: string;

    @IsString()
    @ApiModelProperty({
        description: 'Please insert data following pattern. First number is first bite',
        format: '1, 2, 3,'
    })
    readonly concat: string;

    @IsNumber()
    @ApiModelPropertyOptional({
        description: 'Constant for doing operation with parsed number',
    })
    readonly constant: number;

    @IsEnum(OperationTypes)
    @ApiModelPropertyOptional({
        description: 'Operation type',
        enum: OperationTypes
    })
    readonly operation: string;

    constructor(info: Info) {
        this.pid = info.pid;
        this.description = info.description;
        this.constant = info.constant;
        this.operation = info.operation;
        this.concat = info.concat;
    }
}
