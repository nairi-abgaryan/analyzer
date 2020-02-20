import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { DataEntity } from '../pid-analyze/data.entity';
import { OperationTypes } from '../../utils/enums';

@Entity({ name: 'info' })
export class Info extends AbstractEntity {
    @Column({ nullable: false })
    pid: string;

    @OneToMany(
        type => DataEntity,
        data => data.info,
    )
    data?: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    concat: string;

    @Column({
        type: 'enum',
        enum: OperationTypes,
        default: OperationTypes.NoOperation,
        nullable: true
    })
    operation: string;

    @Column({ nullable: true })
    constant: number;
}
