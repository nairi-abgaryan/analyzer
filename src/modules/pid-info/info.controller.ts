import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { InfoService } from './info.service';

@Controller('info')
@ApiUseTags('Data Info')
export class InfoController {
    constructor(public readonly infoService: InfoService) {}

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: {},
        description: 'Get all information by machine',
    })
    async getMachineInformation(): Promise<void> {
        await this.infoService.getByGID();
    }
}
