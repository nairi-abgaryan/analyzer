import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { InfoService } from './info.service';
import { DataResponse } from './models/DataResponse';
import { UUIDQueryRequest } from './models/UUIDQueryRequest';
import { InfoRequest } from './models/InfoRequest';
import { Info } from './info.entity';

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
    async getData(@Query() uuidQueryRequest: UUIDQueryRequest): Promise<DataResponse[]> {
        return await this.infoService.findDataByInfoID(uuidQueryRequest);
    }

    @Post('pid-info')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: {},
        description: 'Create information data for PID',
    })
    async setInfo(@Body() infoRequest: InfoRequest): Promise<Info> {
        return await this.infoService.createPidInfo(infoRequest);
    }
}
