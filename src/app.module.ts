import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controllers";
import { AppService } from "./app.service";
import { ThrottlerModule } from "@nestjs/throttler";
import { IdAndGenerationValidationMiddleware } from "./middleware/id-and-generation-validation.middleware";
import { RateLimit } from "./config/Rate-limit";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ThrottlerModule.forRoot(RateLimit.config()),
		ConfigModule.forRoot(),
	],

	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IdAndGenerationValidationMiddleware)
			.forRoutes("id/:id", "generation/:generation");
	}
}
