import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { GameModule } from "./game/game.module";
import { Games } from "./entity/Games.entity";

const typeOrmOpts: TypeOrmModuleOptions = {
	type: "sqlite",
	database: "./games.db",
	entities: [Games],
	synchronize: !!process.env.DEV, // Desactivar en produción
};

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmOpts), GameModule],
})
export class AppModule {}
