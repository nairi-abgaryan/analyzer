import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('info')
@ApiUseTags('Data Info')
export class InfoController {
}
