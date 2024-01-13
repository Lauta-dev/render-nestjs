import { Controller, Get, HttpStatus, Param, Query, Res, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { FindOptionsOrderValue } from "typeorm";

import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from "express";
@Controller("games")
export class GameController {
  constructor(private readonly appService: GameService) { }
  // Obtener todos loe juegos
  @UseGuards(ThrottlerGuard)
  @Get("") // Ejemplo: games/
  async getAllGames(
    @Query() q: {
      limit?: string,
      page?: string,

      sort?: FindOptionsOrderValue,
      id?: FindOptionsOrderValue,
      title?: FindOptionsOrderValue,
      year?: FindOptionsOrderValue,
      genration?: FindOptionsOrderValue
    }
  ) {
    const limit = Number(q.limit)
    const page = Number(q.page)
    const sort = q.sort ? q.sort : "ASC"

    return await this.appService.getAllGames({
      limit, page, filters: {

      }
    });
  }

  @Get("consoles")
  async getAllConsoles() {
    return await this.appService.getAllConsoles()
  }

  @Get("generations")
  async getAllGenerations() {
    return await this.appService.getAllGenerations()
  }

  // Obtener los juegos mediante su id
  @UseGuards(ThrottlerGuard)
  @Get("id/:id") // Ejemplo: games/id/1
  async getGameById(
    @Param() param: { id: string },
    @Res() res: Response

  ) {
    const id = parseInt(param.id)
    const game = await this.appService.getGameById(id)

    if ('status' in game) {

      if (game.status !== HttpStatus.OK) {
        res.status(game.status).json(game)
        return
      }
    }

    res.json(game)

  }

  // Obtener los juegos mediante su consola
  @UseGuards(ThrottlerGuard)
  @Get("console/:consoleVideoGame") // Ejemplo: games/console/ps1
  async getGameByConsole(
    @Param() param: { consoleVideoGame: string },
  ) {
    const { consoleVideoGame } = param
    return await this.appService.getGameByConsole(consoleVideoGame)
  }

  // Obtener los juegos mediante su generación
  @UseGuards(ThrottlerGuard)
  @Get("generation/:generation") // Ejemplo -> games/generation/6
  async getGameByGeneration(
    @Param() param: { generation: string }
  ) {
    const generationToNumber = parseInt(param.generation)
    return await this.appService.getGameByGeneration(generationToNumber)
  }
}
