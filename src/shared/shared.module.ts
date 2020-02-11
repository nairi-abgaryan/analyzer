import { Global, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from './services/config.service';
import { GeneratorService } from './services/generator.service';

const providers = [ConfigService, GeneratorService];

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
        JwtModule.registerAsync({
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
