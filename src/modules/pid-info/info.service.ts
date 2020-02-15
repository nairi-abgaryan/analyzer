import { Injectable } from '@nestjs/common';
import { InfoRepository } from './infoRepository';
import { Info } from './info.entity';

@Injectable()
export class InfoService {
    constructor(public readonly infoRepository: InfoRepository) {}

    async findInfoByPID(PID: string): Promise<Info[]> {
        return this.infoRepository.find({where: { PID }})
    }

    async findAll(): Promise<Info[]> {
        return this.infoRepository.find()
    }
}
