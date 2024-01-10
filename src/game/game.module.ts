import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entity/Games.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Games])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule { }
