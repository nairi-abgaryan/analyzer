import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { Info } from './info.entity';

@EntityRepository(Info)
export class InfoRepository extends Repository<Info> {}
