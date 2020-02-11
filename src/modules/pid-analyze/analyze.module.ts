import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';
import { DataRepository } from './dataRepository';

@Module({
    imports: [TypeOrmModule.forFeature([DataRepository])],
    controllers: [AnalyzeController],
    providers: [AnalyzeService],
})
export class AnalyzeModule {}
