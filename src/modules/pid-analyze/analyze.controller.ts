import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { AnalyzeService } from './analyze.service';
import { DataRequest } from './models/DataRequest';
import { DataResponse } from './models/DataResponse';

@Controller('analyze')
@ApiUseTags('Data Analyze')
export class AnalyzeController {
    constructor(public readonly analyzeService: AnalyzeService) {}

    @Post('data')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: {},
        description: 'User info with access token',
    })
    async analyze(@Body() dataRequest: DataRequest): Promise<DataResponse[] | DataResponse> {
        // eslint-disable-next-line no-return-await
        return await this.analyzeService.parseData(dataRequest);
    }
}
