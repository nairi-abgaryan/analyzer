import { ConflictException, Injectable } from '@nestjs/common';
import { InfoRepository } from './infoRepository';
import { Info } from './info.entity';
import { DataRepository } from '../pid-analyze/dataRepository';
import { UUIDQueryRequest } from './models/UUIDQueryRequest';
import { DataResponse } from './models/DataResponse';
import { InfoRequest } from './models/InfoRequest';

@Injectable()
export class InfoService {
    private limit = 500;
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

    async findDataByInfoID(pidQueryRequest: UUIDQueryRequest): Promise<DataResponse[]> {
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

        return <DataResponse[]>await Promise.all(infos.map(async (info: Info) => {
            const infoData = await this.dataRepository.createQueryBuilder('data')
                .select(
                    'value',
                )
                .where("data.info = :id", { id: info.id })
                .limit(this.limit)
                .getRawMany();
            const dataValues = infoData.map(function(data) {
                return data.value
            });

            return {
                description: info.description,
                dataValues
            }
        }));
    }

    async createPidInfo(infoRequest: InfoRequest): Promise<(Info)> {
        const checkInfo = await this.infoRepository.findOne({
            pid: infoRequest.pid,
            description: infoRequest.description
        });

        if (checkInfo !== undefined){
            throw new ConflictException('You already have this pid info')
        }

        return await this.infoRepository.save(infoRequest);
    }
}
