import { ValueTransformer } from 'typeorm';

import { HashService } from '../providers/hash.service';

export class PasswordTransformer implements ValueTransformer {
    to(value) {
        return HashService.generateHash(value);
    }
    from(value) {
        return value;
    }
}
