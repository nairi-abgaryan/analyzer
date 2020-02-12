import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// eslint-disable-next-line import/extensions
import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { AnalyzeModule } from './modules/pid-analyze/analyze.module';
import { InfoModule } from './modules/pid-info/info.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        AnalyzeModule,
        InfoModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
