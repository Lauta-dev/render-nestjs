import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Games } from "src/entity/Games.entity";

export class Sqlite {
  static connection(): TypeOrmModuleOptions {
    return {
      type: "sqlite",
      database: "./games.db",
      entities: [Games],
      synchronize: !!process.env.DEV, // Desactivar en produción
    };
  }
}
