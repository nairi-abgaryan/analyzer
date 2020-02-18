import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InfoController } from './info.controller';
import { Info } from './info.entity';
import { InfoService } from './info.service';
import { AnalyzeModule } from '../pid-analyze/analyze.module';
import { DataRepository } from '../pid-analyze/dataRepository';

@Module({
    imports: [
        forwardRef(() => AnalyzeModule),
        TypeOrmModule.forFeature([Info, DataRepository])
    ],
    controllers: [InfoController],
    providers: [InfoService],
    exports: [InfoService]
})
export class InfoModule {}
