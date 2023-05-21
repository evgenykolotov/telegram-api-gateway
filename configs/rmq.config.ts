import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const getRMQConfig = (): MicroserviceOptions => ({
	transport: Transport.RMQ,
	options: {
		urls: [
			{
				hostname: process.env.RABBITMQ_DEFAULT_HOSTNAME,
				username: process.env.RABBITMQ_DEFAULT_USER,
				password: process.env.RABBITMQ_DEFAULT_PASS,
			},
		],
		queue: process.env.RABBITMQ_DEFAULT_QUEUE,
		queueOptions: { durable: true },
		prefetchCount: 32,
	},
});
