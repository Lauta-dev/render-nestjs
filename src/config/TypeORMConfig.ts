import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Games } from "src/entity/Games.entity";

@Injectable()
export class SQLiteConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const opts: TypeOrmModuleOptions = {
      type: "sqlite",
      database: "../db.sqlite",
      entities: [Games],
      logging: true,
      synchronize: true, // Desactivar en produción
    };

    return opts;
  }
}
