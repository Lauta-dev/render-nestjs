import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "./entity/Games.entity";
import { AppController } from "./app.controllers";
import { AppService } from "./app.service";
import { ThrottlerModule } from "@nestjs/throttler";
import { IdAndGenerationValidationMiddleware } from "./middleware/id-and-generation-validation.middleware";
import { Sqlite } from "./config/Sqlite";
import { RateLimit } from "./config/Rate-limit";

@Module({
	imports: [
		TypeOrmModule.forRoot(Sqlite.connection()),
		TypeOrmModule.forFeature([Games]),
		ThrottlerModule.forRoot(RateLimit.config()),
	],

	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IdAndGenerationValidationMiddleware)
			.forRoutes("/id/:id", "generation/:generation");
	}
}
