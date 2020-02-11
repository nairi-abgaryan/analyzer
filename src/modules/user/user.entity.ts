import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { PasswordTransformer } from '../../utils/password.transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, transformer: new PasswordTransformer() })
    password: string;

    @Column({ nullable: true })
    phone: string;
}
