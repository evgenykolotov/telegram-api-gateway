import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { getRMQConfig } from '@config/rmq.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
	/** Создание NestJS приложения */
	const app = await NestFactory.create(AppModule);

	/** Подключение к RabbitMQ accounts service */
	app.connectMicroservice(getRMQConfig());
	await app.startAllMicroservices();

	/** Конфигурирование пакета Swagger */
	const config = new DocumentBuilder()
		.setTitle('Telegram API Gateway')
		.setDescription('OpenAPI for Telegram Application')
		.setVersion('1.3.1')
		.build();

	/** Создание документа SwaggerModule */
	const document = SwaggerModule.createDocument(app, config, {});

	/** Генерация страницы с OpenAPI */
	SwaggerModule.setup('/api/swagger', app, document);

	/** Прослушивание порта 3000 */
	await app.listen(3000);
}

bootstrap().then(() => Logger.log('🚀 Telegram-api-gateway microservice is running on port: 3000'));
