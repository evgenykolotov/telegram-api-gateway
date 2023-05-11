import { RMQModule } from 'nestjs-rmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getRMQConfig } from '@config/rmq.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `environment/.${process.env.NODE_ENV}.env`,
		}),
		RMQModule.forRootAsync(getRMQConfig()),
	],
})
export class AppModule {}
