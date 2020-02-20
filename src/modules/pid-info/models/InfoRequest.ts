import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { OperationTypes } from '../../../utils/enums';

export class InfoRequest {
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
}
