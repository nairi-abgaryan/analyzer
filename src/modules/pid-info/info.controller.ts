import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { InfoService } from './info.service';
import { UUIDQueryRequest } from './models/UUIDQueryRequest';
import { InfoResponse } from './models/InfoResponse';

@Controller('info')
@ApiUseTags('Data Info')
export class InfoController {
    constructor(public readonly infoService: InfoService) {}

    @Get('pid-data')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: {},
        description: 'Get Data by PID',
    })
    @ApiImplicitParam({ name: 'PIDs', required: false})
    async analyzeFile(@Query() uuidQueryRequest: UUIDQueryRequest): Promise<InfoResponse[]> {
        return await this.infoService.findDataByInfo(uuidQueryRequest);
    }
}
