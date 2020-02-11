import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { DataEntity } from './data.entity';

@EntityRepository(DataEntity)
export class DataRepository extends Repository<DataEntity> {}
