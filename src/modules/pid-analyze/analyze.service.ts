import { Injectable } from '@nestjs/common';

import { DataRequest } from './models/DataRequest';
import { InfoService } from '../pid-info/info.service';
import { Info } from '../pid-info/info.entity';
import { DataRepository } from './dataRepository';
import { DataEntity } from './data.entity';
import { DataResponse } from './models/DataResponse';
import { Mapper } from '../../providers/mapper.service';

import uuid = require('uuid');

@Injectable()
export class AnalyzeService {
    constructor(
        public readonly dataRepository: DataRepository,
        public readonly infoService: InfoService,
    ) {}

    async parseData(dataRequest: DataRequest): Promise<DataResponse[] | DataResponse> {
        let dataArray = dataRequest.data.split(" ");
        const PID = dataArray[0];
        dataArray = dataArray.slice(2);
        const PIDsInfo = await this.infoService.findInfoByPID(PID);

        const parsedPIDData = PIDsInfo.map((info: Info): DataEntity => {
            let number = '';
            const concatNumbers = info.concat.split(",");
            concatNumbers.forEach((n: string) => {
                 number += parseInt(dataArray[n],16);
            });

            return {
                id: uuid.v4(),
                pid: PID,
                value: number,
                info,
            }
        });

        await this.dataRepository.BulkCreate(parsedPIDData);

        return  Mapper.map(parsedPIDData, DataResponse);
    }
}
