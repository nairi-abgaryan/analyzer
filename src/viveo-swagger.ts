import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('API')
        .setVersion('0.0.1')
        .addBearerAuth()
        .setSchemes('http', 'https')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}
