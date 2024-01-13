import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Games } from "./entity/Games.entity";
import { AppController } from "./app.controllers";
import { AppService } from "./app.service";
import { ThrottlerModule } from "@nestjs/throttler";

const typeOrmOpts: TypeOrmModuleOptions = {
	type: "sqlite",
	database: "./games.db",
	entities: [Games],
	synchronize: !!process.env.DEV, // Desactivar en produción
};

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmOpts),
		TypeOrmModule.forFeature([Games]),
		ThrottlerModule.forRoot([
			{
				name: "Per-minutes",
				ttl: 60000,
				limit: 60,
			},
			{
				name: "Per-second",
				ttl: 10000,
				limit: 3,
			},
		]),
	],

	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
