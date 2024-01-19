import { HttpStatus, Injectable } from "@nestjs/common";
import { VideoGameDetails } from "./interface/VideoGameDetails.interface";
import { ErrorInfo } from "./interface/ErrorInfo.interface";
import { formatGame } from "./utils/formatGame";
import { Generations } from "./interface/Generations.interface";
import { createClient } from "@libsql/client";
import { Db } from "./db/Db";

type GamesOrErrorResult = VideoGameDetails[] | ErrorInfo;

@Injectable()
export class AppService {
	private async formatGames(games): Promise<VideoGameDetails[]> {
		const formatGames = games.map((game) => formatGame(game));
		return formatGames;
	}

	private connect() {
		return createClient({
			url: process.env.TURSO_URL,
			authToken: process.env.TURSO_TOKEN,
		});
	}

	private async findBy({ ...data }): Promise<GamesOrErrorResult> {
		try {
			const games = [];
			if (!games.length) {
				return {
					message: `Esta/e ${Object.keys(data)[0]} no existe`,
					status: HttpStatus.NOT_FOUND,
					error: false,
				};
			}

			const formatGames = await this.formatGames(games);

			return formatGames;
		} catch (error) {
			return {
				message: "Internal Server Error",
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: true,
			};
		}
	}

	async getGameById(id: number): Promise<VideoGameDetails | ErrorInfo> {
		try {
			const rows = await new Db().getGameById(id);

			if (!rows) {
				return {
					status: HttpStatus.NO_CONTENT,
					error: false,
					message: "Null",
				};
			}

			return formatGame(rows[0]);
		} catch (error) {
			console.log(error);
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: true,
				message: "no se",
			};
		}
	}

	async getGameByConsole(console: string): Promise<GamesOrErrorResult> {
		const game = await this.findBy({ consoleSmallName: console });
		return game;
	}

	async getGameByGeneration(
		generation: number,
	): Promise<GamesOrErrorResult> {
		const game = await this.findBy({ generation });
		return game;
	}

	async getAllGames({
		limit,
		page,
		filters,
	}: {
		limit?: number;
		page?: number;
		filters?: {
			id?: any;
			year?: any;
			generation?: any;
		};
	}) {
		return await new Db().getAllGames();
	}

	async getAllConsoles() {
		try {
			const consoles = await new Db().getAllConsoles();

			if (!consoles.length) {
				return {
					status: HttpStatus.NO_CONTENT,
					message: "Las consolas no existen",
					error: false,
				};
			}

			return consoles;
		} catch (error) {
			console.log(error);
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "INTERNAL SERVER ERROR",
				error: true,
			};
		}
	}

	async getAllGenerations() {
		try {
			const generation = await new Db().getAllGeneration();

			if (!generation.length) {
				return {
					message: "No existes las generaciones",
					status: HttpStatus.NO_CONTENT,
					error: false,
				};
			}

			return generation;
		} catch (error) {
			return {
				message: "Error interno del servidor",
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: true,
			};
		}
	}
}
