import { IRMQServiceAsyncOptions } from 'nestjs-rmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
	inject: [ConfigService],
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => ({
		exchangeName: configService.get('RABBITMQ_DEFAULT_EXCHANGE') ?? '',
		connections: [
			{
				login: configService.get('RABBITMQ_DEFAULT_USER') ?? '',
				password: configService.get('RABBITMQ_DEFAULT_PASS') ?? '',
				host: configService.get('RABBITMQ_DEFAULT_HOSTNAME') ?? '',
			},
		],
		queueName: configService.get('RABBITMQ_DEFAULT_QUEUE') ?? '',
		prefetchCount: 32,
		serviceName: 'telegram-api-gateway',
	}),
});
