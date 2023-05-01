import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
	/** Создание NestJS приложения */
	const app = await NestFactory.create(AppModule);

	/** Конфигурирование пакета Swagger */
	const config = new DocumentBuilder()
		.setTitle('Telegram API Gateway')
		.setDescription('OpenAPI for Telegram Application')
		.setVersion('1.1.1')
		.build();

	/** Создание документа SwaggerModule */
	const document = SwaggerModule.createDocument(app, config);

	/** Генерация страницы с OpenAPI */
	SwaggerModule.setup('/api/swagger', app, document);

	/** Прослушивание порта 3000 */
	await app.listen(3000);
}

bootstrap();
