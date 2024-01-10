import { Module } from "@nestjs/common";
import { SQLiteConfig } from "./config/TypeORMConfig";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { GameModule } from "./game/game.module";
import { Games } from "./entity/Games.entity";

const opts: TypeOrmModuleOptions = {
	type: "sqlite",
	database: "./db.sqlite",
	entities: [Games],
	logging: true,
	synchronize: true, // Desactivar en produción
};

@Module({
	imports: [TypeOrmModule.forRoot(opts), GameModule],
	providers: [SQLiteConfig],
})
export class AppModule {}
