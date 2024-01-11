import { Controller, Get, Param, Query } from "@nestjs/common";
import { Games } from "src/entity/Games.entity";
import { GameService } from "./game.service";

@Controller("games")
export class GameController {
  constructor(private readonly appService: GameService) { }

  // Obtener todos loe juegos
  @Get() // Ejemplo: games/
  async getAllGames(): Promise<Games[]> {
    return await this.appService.getAllGames();
  }

  // Obtener los juegos mediante su id
  @Get("id/:id") // Ejemplo: games/id/1
  async getGameById(
    @Param() param: { id: string }
  ) {
    const idToNumber = parseInt(param.id)
    return await this.appService.getGameById(idToNumber)
  }

  // Obtener los juegos mediante su consola
  @Get("console/:consoleVideoGame") // Ejemplo: games/console/ps1
  async getGameByConsole(
    @Param() param: { consoleVideoGame: string }
  ) {
    const { consoleVideoGame } = param
    return await this.appService.getGameByConsole(consoleVideoGame)
  }

  // Obtener los juegos mediante su generación
  @Get("genration/:generation") // Ejemplo -> games/generation/6
  async getGameByGeneration(
    @Param() param: { generation: string }
  ) {
    const generationToNumber = parseInt(param.generation)
    return await this.appService.getGameByGeneration(generationToNumber)
  }
}
