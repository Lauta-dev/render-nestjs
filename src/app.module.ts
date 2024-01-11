import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { GameModule } from "./game/game.module";
import { Games } from "./entity/Games.entity";

const opts: TypeOrmModuleOptions = {
	type: "sqlite",
	database: "./db.sqlite",
	entities: [Games],
	synchronize: !!process.env.DEV, // Desactivar en produción
};

@Module({
	imports: [TypeOrmModule.forRoot(opts), GameModule],
})
export class AppModule {}
