import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';
import { DataRepository } from './dataRepository';
import { InfoModule } from '../pid-info/info.module';

@Module({
    imports: [
        forwardRef(() => InfoModule),
        TypeOrmModule.forFeature([DataRepository])
    ],
    controllers: [AnalyzeController],
    providers: [AnalyzeService],
})
export class AnalyzeModule {}
