import { Injectable } from '@nestjs/common';
import { InfoRepository } from './infoRepository';
import { Info } from './info.entity';
import { DataRepository } from '../pid-analyze/dataRepository';
import { UUIDQueryRequest } from './models/UUIDQueryRequest';
import { InfoResponse } from './models/InfoResponse';

@Injectable()
export class InfoService {
    constructor(
        public readonly infoRepository: InfoRepository,
        public readonly dataRepository: DataRepository,
    ) {}

    async findInfoByPID(PID: string): Promise<Info[]> {
        return this.infoRepository.find({where: { pid: PID }})
    }

    async findAll(): Promise<Info[]> {
        return this.infoRepository.find()
    }

    async findDataByInfo(pidQueryRequest: UUIDQueryRequest): Promise<InfoResponse[]> {
        const UUIDs = [];
        pidQueryRequest.infoUUIDs.split(',').forEach(function(info: string) {
            UUIDs.push(info)
        });

        const infos = await this.infoRepository.createQueryBuilder('info')
            .select([
                'id',
                'pid',
                'description'
            ])
            .where("info.id IN (:...id)", { id: UUIDs })
            .execute();

        if (infos.length === 0)
            return ;

        const pidInfo = <InfoResponse[]>await Promise.all(infos.map(async (info: Info) => {
            const data = await this.dataRepository.createQueryBuilder('data')
                .select([
                    'value',
                ])
                .where("data.info = :id", { id: info.id })
                .getRawMany();

           return  {
               description: info.description,
               data
            }
         }));

        return pidInfo;
    }
}
