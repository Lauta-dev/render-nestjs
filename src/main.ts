import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors();
	app.disable("x-powered-by", "X-Powered-By");
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
