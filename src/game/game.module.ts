import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entity/Games.entity";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
	imports: [
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
	controllers: [GameController],
	providers: [GameService],
})
export class GameModule {}
