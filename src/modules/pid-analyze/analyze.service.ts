import { Injectable } from '@nestjs/common';

import { DataRequest } from './models/DataRequest';

@Injectable()
export class AnalyzeService {
    async analyze(data: DataRequest): Promise<DataRequest> {
        return data;
    }
}
