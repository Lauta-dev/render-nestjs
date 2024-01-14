import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entity/Games.entity';
import { FindManyOptions, FindOneOptions, FindOptionsOrder, FindOptionsOrderValue, FindOptionsWhere, Repository } from 'typeorm';

export interface ReturnError {
  message: string;
  status: number;
  error: boolean;
}

export interface GamesReturn {
  id: number,
  title: string,
  description: string,
  genre: string,
  generation: number,
  price: number,

  covers: {
    webp: string,
    jpg: string
  },
  consoleName: {
    short: string,
    public: string,
  }
}

type R = GamesReturn[] | ReturnError

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Games)
    private GamesRepository: Repository<Games>
  ) { }

  private async formatGames(games: Games[]): Promise<GamesReturn[]> {
    const formatGames = games.map(game => ({
      id: game.id,
      title: game.title,
      description: game.descripcion,
      genre: game.genre,
      generation: game.generation,
      price: game.precio,
      covers: {
        webp: game.coverWebp,
        jpg: game.coverJpg
      },
      consoleName: {
        short: game.consoleSmallName,
        public: game.consolePublicName,
      }
    }))

    return formatGames
  }

  private async findBy({ ...data }: FindOptionsWhere<Games>): Promise<R> {
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
        } as ReturnError
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

  async getGameById(id: number): Promise<GamesReturn | ReturnError> {
    const game = await this.GamesRepository.findOne({ where: { id } })
    const formatGame = {
      id: game.id,
      title: game.title,
      description: game.descripcion,
      price: game.precio,
      generation: game.generation,
      release: game.releaseYear,
      genre: game.genre,
      consoleName: {
        short: game.consoleSmallName,
        public: game.consolePublicName
      },
      covers: {
        webp: game.coverWebp,
        jpg: game.coverJpg
      },

    }

    return formatGame
  }

  async getGameByConsole(console: string): Promise<R> {
    const game = await this.findBy({ consoleSmallName: console })
    return game
  }

  async getGameByGeneration(generation: number): Promise<R> {
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
  }): Promise<R> {
    const l = Number.isNaN(limit) ? 10 : limit;
    const checkPage = Number.isNaN(page) ? 0 : page;

    const order: FindOptionsOrder<Games> = {
      ...filters
    }


    /* TODO: Agregar una forma de validar diferentes campos
    if (l) {
      return {
        error: true,
        status: HttpStatus.BAD_REQUEST,
        message: "No se puede completar la respuesta por que el 'limit' no esta definido correctamente"
      }
    }

    if (checkPage) {
      return {
        error: true,
        status: HttpStatus.BAD_REQUEST,
        message: "No se puede completar la respuesta por que el 'page' no esta definido correctamente"
      }
    }
*/
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


  async getAllConsoles() {
    try {

      const consoles = await this.GamesRepository
        .createQueryBuilder()
        .select("console_small_name AS consoleSmallName, console_public_name AS consolePublicName")
        .groupBy("console_small_name, console_public_name")
        .execute();

      return consoles
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR
      }
    }

  }

  async getAllGenerations() {
    try {
      const generation = await this.GamesRepository
        .createQueryBuilder()
        .select("generation")
        .groupBy("generation")
        .execute();

      return generation
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR
      }
    }

  }

}
