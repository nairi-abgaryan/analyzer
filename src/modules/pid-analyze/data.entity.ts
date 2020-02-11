import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Info } from '../pid-info/info.entity';

@Entity({ name: 'data' })
export class DataEntity extends AbstractEntity {
    @Column({ nullable: true })
    pid: string;

    @Column({ nullable: true })
    number: string;

    @OneToMany(
        type => Info,
        info => info.data,
    )
    info: Info[];
}
