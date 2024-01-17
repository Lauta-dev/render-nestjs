import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Query,
	Res,
	UseGuards,
} from "@nestjs/common";
import { FindOptionsOrderValue, ObjectIdColumn } from "typeorm";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Response, query } from "express";
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

      id?: FindOptionsOrderValue,
      title?: FindOptionsOrderValue,
      year?: FindOptionsOrderValue,
      genration?: FindOptionsOrderValue
    },
		@Res() res: Response,
	) {
		let limit = Number(q.limit);
		let page = Number(q.page);
		const sorts = ["asc", "desc"];
		const querys = { ...q };

		if (limit && Number.isNaN(limit)) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json("El limit tiene que ser un número");
		}

		if (page && Number.isNaN(page)) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json("El page tiene que ser un número");
		}

		limit = Number.isNaN(limit) ? 10 : limit;
		page = Number.isNaN(page) ? 0 : page;

		const filters = Object.fromEntries(
			Object.entries(querys).filter((data) => {
				const word = data[1].toString().toLowerCase();
				return sorts.includes(word) ? data[1] : null;
			}),
		);

		const games = await this.appService.getAllGames({
			page,
			filters,
			limit,
		});

		res.json(games);
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
