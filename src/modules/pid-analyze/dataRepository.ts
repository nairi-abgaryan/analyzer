import { Repository, getConnection } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DataEntity } from './data.entity';

@EntityRepository(DataEntity)
export class DataRepository extends Repository<DataEntity> {
    public async BulkCreate(data: DataEntity[]) {
         await getConnection()
            .createQueryBuilder()
            .insert()
            .into(DataEntity)
            .values(data)
            .execute();
    }
}
