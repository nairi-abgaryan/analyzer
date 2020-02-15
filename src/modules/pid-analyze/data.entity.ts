import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Info } from '../pid-info/info.entity';

@Entity({ name: 'data' })
export class DataEntity extends AbstractEntity {
    @Column({ nullable: false })
    pid: string;

    @Column({ nullable: false })
    value: number;

    @ManyToOne(
        type => Info,
        info => info.data,
    )
    info: Info;
}
