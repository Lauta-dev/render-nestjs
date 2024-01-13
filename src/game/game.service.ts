import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entity/Games.entity';
import { FindManyOptions, FindOneOptions, FindOptionsOrder, FindOptionsOrderValue, FindOptionsWhere, Repository } from 'typeorm';

export interface ReturnError {
  message: string;
  status: number;
  error: boolean;
}

type f = Games[] | ReturnError

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Games)
    private GamesRepository: Repository<Games>
  ) { }

  private async findBy({ ...data }: FindOptionsWhere<Games>): Promise<f> {
    const opts: FindOneOptions<Games> = {
      where: { ...data }
    }

    try {
      const game = await this.GamesRepository.find(opts)
      if (!game.length) {
        return {
          message: `Esta/e ${Object.keys(data)[0]} no existe`,
          status: HttpStatus.NOT_FOUND,
          error: false,
        } as ReturnError
      }

      return game
    } catch (error) {
      return {
        message: "Internal Server Error",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: true
      }
    }
  }

  async getGameById(id: number): Promise<Games | ReturnError> {
    const game = await this.GamesRepository.findOne({ where: { id } })
    return game
  }

  async getGameByConsole(console: string): Promise<Games[] | ReturnError> {
    const game = await this.findBy({ consoleSmallName: console })
    return game
  }

  async getGameByGeneration(generation: number): Promise<Games[] | ReturnError> {
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
  }): Promise<Games[] | ReturnError> {
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

    return await this.GamesRepository.find(opts)
  }


  async getAllConsoles() {
    try {

      const generations = await this.GamesRepository
        .createQueryBuilder()
        .select("console_small_name AS consoleSmallName, console_public_name AS consolePublicName")
        .groupBy("console_small_name, console_public_name")
        .execute();

      return generations
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR
      }
    }

  }

  async getAllGenerations() {
    try {
      const getConsoles = await this.GamesRepository
        .createQueryBuilder()
        .select("generation")
        .groupBy("generation")
        .execute();

      return getConsoles
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR
      }
    }

  }

}
