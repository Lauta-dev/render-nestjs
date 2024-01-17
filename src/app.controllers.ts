import { Controller, Get, Param, Query, Res, UseGuards } from "@nestjs/common";
import { FindOptionsOrderValue } from "typeorm";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Response } from "express";
import { AppService } from "./app.service";

@Controller()
@UseGuards(ThrottlerGuard)
export class AppController {
	constructor(private readonly appService: AppService) {}

	/*
	 * Recuperar todos los juegos
	 * /
	 *
	 * */
	@Get("")
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

	/*
	 * Recuperar todas las consolas de juegos
	 * /consoles
	 *
	 * */
	@Get("consoles")
	async getAllConsoles() {
		return await this.appService.getAllConsoles();
	}

	/*
	 * Recuperar todass las generaciones de juegos
	 * /generations
	 *
	 * */
	@Get("generations")
	async getAllGenerations() {
		return await this.appService.getAllGenerations();
	}

	/*
	 *  Obtener los juegos mediante su id
	 * /id/1
	 *
	 * */
	@Get("id/:id")
	async getGameById(@Param() param: { id: number }, @Res() res: Response) {
		const { id } = param;
		const game = await this.appService.getGameById(id);
		res.json(game);
	}

	/*
	 * Obtener los juegos mediante su consola
	 * /console/ps1
	 *
	 * */
	@Get("console/:consoleVideoGame")
  async getGameByConsole(
    @Param() param: { consoleVideoGame: string },
  ) {
    const { consoleVideoGame } = param
    return await this.appService.getGameByConsole(consoleVideoGame)
  }

	/*
	 * Obtener los juegos mediante su generación
	 * /generation/1
	 *
	 * */
	@Get("generation/:generation")
	async getGameByGeneration(
		@Param() param: { generation: string },
		@Res() res: Response,
	) {
		const generation = Number(param.generation);
		res.json(await this.appService.getGameByGeneration(generation));
	}
}
