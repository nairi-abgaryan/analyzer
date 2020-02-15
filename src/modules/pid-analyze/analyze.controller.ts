import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiImplicitFile, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyzeService } from './analyze.service';
import { DataRequest } from './models/DataRequest';

@Controller('analyze')
@ApiUseTags('Data Analyze')
export class AnalyzeController {
    constructor(public readonly analyzeService: AnalyzeService) {}

    @Post('data')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: {},
        description: 'Pid data parse request',
    })
    async analyze(@Body() dataRequest: DataRequest): Promise<boolean> {
        return await this.analyzeService.parseLine(dataRequest);
    }

    @Post('file')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: {},
        description: 'Pid file parse request',
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'file', required: true })
    async analyzeFile(@UploadedFile() file): Promise<number> {
        return await this.analyzeService.parseFile(file.buffer);
    }
}
