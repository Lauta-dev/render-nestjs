import { HttpStatus, Injectable } from "@nestjs/common";
import { VideoGameDetails } from "./interface/VideoGameDetails.interface";
import { ErrorInfo } from "./interface/ErrorInfo.interface";
import { formatGame } from "./utils/formatGame";
import { Db } from "./db/Db";
import { allConsoles } from "./utils/allConsoles";

type GamesOrErrorResult = VideoGameDetails[] | ErrorInfo;

@Injectable()
export class AppService {
	private async formatGames(games): Promise<VideoGameDetails[]> {
		const formatGames = games.map((game) => formatGame(game));
		return formatGames;
	}

	async getGameById(id: number): Promise<VideoGameDetails | ErrorInfo> {
		try {
			const rows = await new Db().getGameById(id);

			if (!rows.length) {
				return {
					status: HttpStatus.OK,
					error: false,
					message: "El juego no exite",
				};
			}

			return formatGame(rows[0]);
		} catch (error) {
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: true,
				message: "INTERNAL SERVER ERROR",
			};
		}
	}

	async getGameByConsole(console: string) {
		const games = await new Db().getGameByConsole(console);
		const g = this.formatGames(games);
		return g;
	}

	async getGameByGeneration(
		generation: number,
	): Promise<GamesOrErrorResult> {
		const games = await new Db().getGameByGeneration(generation);
		const g = this.formatGames(games);
		return g;
	}

	async getAllGames({
		limit,
		page,
	}: {
		limit?: number;
		page?: number;
		filters?: {
			id?: any;
			year?: any;
			generation?: any;
		};
	}) {
		const games = this.formatGames(
			await new Db().getAllGames({ limit, page }),
		);

		return games;
	}

	async getAllConsoles() {
		try {
			const consoles = process.env.PROD
				? await new Db().getAllConsoles()
				: allConsoles;

			if (!consoles.length) {
				return {
					status: HttpStatus.NO_CONTENT,
					message: "Las consolas no existen",
					error: false,
				};
			}

			return consoles;
		} catch (error) {
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
