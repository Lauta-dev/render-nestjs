import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entity/Games.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';


@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Games)
    private GamesRepository: Repository<Games>
  ) { }

  private async findOneBy({ ...data }: FindOptionsWhere<Games>) {
    const opts: FindOneOptions<Games> = {
      where: { ...data }
    }

    try {
      const game = await this.GamesRepository.find(opts)
      if (!game.length) {
        return {
          message: `Esta/e ${Object.keys(data)[0]} no existe`,
          status: HttpStatus.NOT_FOUND,
          error: null,
          game
        }
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

  async getGameById(id: number): Promise<Games[] | {
    message: string;
    status: number;
    error: null | boolean;
  }> {

    try {
      const game = await this.findOneBy({ id })
      return game
    } catch (e) {
      console.log(e)
    }

  }

  async getGameByConsole(console: string): Promise<Games[] | {
    message: string;
    status: number;
    error: null | boolean;
  }> {
    const game = await this.findOneBy({ consoleSmallName: console })
    return game
  }

  async getGameByGeneration(generation: number): Promise<Games[] | {
    message: string;
    status: number;
    error: null | boolean;
  }> {
    const game = await this.findOneBy({ generation })
    return game
  }

  async getAllGames(): Promise<Games[]> {
    const opts: FindManyOptions<Games> = {}

    return await this.GamesRepository.find(opts)
  }

  async q(q: { limit: number | undefined, console: string | undefined }) {
    const { console, limit } = q
    const consoleToUpperCase = console?.toUpperCase()

    const opts: FindManyOptions<Games> = {
      take: limit || 50,
      where: consoleToUpperCase ? { consoleSmallName: consoleToUpperCase } : {},
      cache: true
    }

    return await this.GamesRepository.find(opts)
  }
}
