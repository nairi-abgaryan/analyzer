import { Injectable } from '@nestjs/common';

import { InfoService } from '../pid-info/info.service';
import { Info } from '../pid-info/info.entity';
import { DataRepository } from './dataRepository';
import { DataEntity } from './data.entity';
import { OperationTypes } from '../../utils/enums';
import { DataRequest } from './models/DataRequest';

import uuid = require('uuid');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const perf = require('execution-time')(console.log);

@Injectable()
export class AnalyzeService {
    private parsedPIDData = [];
    constructor(
        public readonly dataRepository: DataRepository,
        public readonly infoService: InfoService,
    ) {
     this.parsedPIDData = [];
    }

    async parseData(PID, dataArray: string[], PIDsInfo): Promise<void> {
       PIDsInfo.forEach((info: Info): DataEntity => {
            let number = 0;
            const concatNumbers = info.concat.split(",");
            concatNumbers.forEach((n: string) => {
                number += parseInt(dataArray[n], 16);
            });

            switch (info.operation) {
                case  OperationTypes.Plus:
                    number += info.constant;
                    break;
                case  OperationTypes.Minus:
                    number -= info.constant;
                    break;
                case  OperationTypes.Divide:
                    number /= info.constant;
                    break;
                case  OperationTypes.Multiply:
                    number *= info.constant;
                    break;
                default:
                    return;
            }

            this.parsedPIDData.push({
                id: uuid.v4(),
                pid: PID,
                value: number,
                info,
            });
        });
    }

    async parseFile(file: Buffer): Promise<number> {
        perf.start();
        const dataArray = file.toString().split("\n");
        const PIDsInfo = await this.infoService.findAll();

        dataArray.forEach((data: string ) => {
            const splitLine = data.split(" ");
            const PID = splitLine[0];
            const lineArray= splitLine.slice(2);
            const CurrentPIDInfo = PIDsInfo.find(info => info.pid === PID);

            if (CurrentPIDInfo)
                return this.parseData(PID, lineArray, [CurrentPIDInfo]);

            return null;
        });

        await this.dataRepository.BulkCreate(this.parsedPIDData);

        const results = perf.stop();
        console.log(results.time);  // in milliseconds
        this.parsedPIDData = [];

        return results.time;
    }

    async parseLine(dataRequest: DataRequest): Promise<boolean> {
        // eslint-disable-next-line no-undef
        const t0 = performance.now();
        const splitLine = dataRequest.data.split(" ");
        const PID = splitLine[0];
        const lineArray = splitLine.slice(2);
        const PIDsInfo = await this.infoService.findInfoByPID(PID);

        await this.parseData(PID, lineArray, PIDsInfo);

        this.parsedPIDData = await Promise.all(this.parsedPIDData.filter((data: string ) => {
            if (data === null || data === undefined ){
                return false;
            }

            return data;
        }));

        await this.dataRepository.save(this.parsedPIDData);
        // eslint-disable-next-line no-undef
        const t1 = performance.now();
        console.log(`Call to doSomething took ${  t1 - t0  } milliseconds.`);

        return true;
    }
}
