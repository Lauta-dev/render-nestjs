import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entity/Games.entity';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsOrderValue,
  FindOptionsWhere,
  Repository
} from 'typeorm';
import { VideoGameDetails } from './interface/VideoGameDetails.interface';
import { ErrorInfo } from './interface/ErrorInfo.interface';
import { formatGame } from './utils/formatGame';
import { Generations } from './interface/Generations.interface';
import { Consoles } from './interface/Consoles.interface';

type GamesOrErrorResult = VideoGameDetails[] | ErrorInfo

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Games)
    private GamesRepository: Repository<Games>
  ) { }

  private async formatGames(games: Games[]): Promise<VideoGameDetails[]> {
    const formatGames = games.map(game => formatGame(game))
    return formatGames
  }

  private async findBy({ ...data }: FindOptionsWhere<Games>): Promise<GamesOrErrorResult> {
    const opts: FindOneOptions<Games> = {
      where: { ...data }
    }

    try {
      const games = await this.GamesRepository.find(opts)
      if (!games.length) {
        return {
          message: `Esta/e ${Object.keys(data)[0]} no existe`,
          status: HttpStatus.NOT_FOUND,
          error: false,
        }
      }

      const formatGames = await this.formatGames(games)

      return formatGames
    } catch (error) {
      return {
        message: "Internal Server Error",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: true
      }
    }
  }

  async getGameById(id: number): Promise<VideoGameDetails | ErrorInfo> {
    try {
      const game = await this.GamesRepository.findOneBy({ id })

      if (!game) {
        return {
          status: HttpStatus.NO_CONTENT,
          error: false,
          message: "Null"
        }
      }

      return formatGame(game)
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: true,
        message: "no se"
      }
    }

  }

  async getGameByConsole(console: string): Promise<GamesOrErrorResult> {
    const game = await this.findBy({ consoleSmallName: console })
    return game
  }

  async getGameByGeneration(generation: number): Promise<GamesOrErrorResult> {
    const game = await this.findBy({ generation })
    return game
  }

  async getAllGames({
    limit = 10,
    page = 0,
    sort = "ASC",
    filters = {}
  }: {
    limit?: number,
    page?: number,
    sort?: FindOptionsOrderValue,
    filters?: {
      id?: FindOptionsOrderValue,
      year?: FindOptionsOrderValue,
      generation?: FindOptionsOrderValue
    }
  }): Promise<GamesOrErrorResult> {
    const l = Number.isNaN(limit) ? 10 : limit;
    const checkPage = Number.isNaN(page) ? 0 : page;

    const order: FindOptionsOrder<Games> = {
      ...filters
    }

    const opts: FindManyOptions<Games> = {
      take: l, // limit
      skip: checkPage,
      order,
      cache: true
    }

    const games = await this.GamesRepository.find(opts)

    const formatGames = await this.formatGames(games)
    return formatGames

  }


  async getAllConsoles(): Promise<Consoles[] | ErrorInfo> {
    try {
      const consoles: Consoles[] = await this.GamesRepository
        .createQueryBuilder()
        .select("console_small_name AS short, console_public_name AS public")
        .groupBy("console_small_name, console_public_name")
        .execute();

      if (!consoles.length) {
        return {
          status: HttpStatus.NO_CONTENT,
          message: "Las consolas no existen",
          error: false
        }
      }

      return consoles
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "INTERNAL SERVER ERROR",
        error: true
      }
    }
  }

  async getAllGenerations(): Promise<Generations[] | ErrorInfo> {
    try {
      const generation: Generations[] = await this.GamesRepository
        .createQueryBuilder()
        .select("generation")
        .groupBy("generation") // Agrupar todas las generaciónes para evitar que se repitan
        .execute();

      if (!generation.length) {
        return {
          message: "No existes las generaciones",
          status: HttpStatus.NO_CONTENT,
          error: false
        }
      }

      return generation
    } catch (error) {
      return {
        message: "Error interno del servidor",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: true
      }
    }
  }
}
