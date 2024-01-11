import { Body, Controller, Get, Post } from "@nestjs/common";
import { Games } from "src/entity/Games.entity";
import { GameService } from "./game.service";

@Controller("game")
export class GameController {
  constructor(private readonly appService: GameService) { }

  @Get()
  async getHello(): Promise<Games[]> {
    return await this.appService.getHello();
  }

  @Post("/asd")
  async i(
    @Body() body: { title: string }
  ) {
    return await this.appService.insertData(body.title);
  }
}
