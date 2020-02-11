import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { DataEntity } from '../pid-analyze/data.entity';

@Entity({ name: 'info' })
export class Info extends AbstractEntity {
    @Column({ nullable: false })
    pid: string;

    @ManyToOne(
        type => DataEntity,
        data => data.info,
    )
    data: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    concat: string;
}
