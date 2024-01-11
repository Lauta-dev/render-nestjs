import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entity/Games.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

interface ReturnError {
  message: string;
  status: number;
  error: boolean;
}

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
          error: false,
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

  async getGameById(id: number): Promise<Games[] | ReturnError> {
    const game = await this.findOneBy({ id })
    return game

  }

  async getGameByConsole(console: string): Promise<Games[] | ReturnError> {
    const game = await this.findOneBy({ consoleSmallName: console })
    return game
  }

  async getGameByGeneration(generation: number): Promise<Games[] | ReturnError> {
    const game = await this.findOneBy({ generation })
    return game
  }

  async getAllGames(): Promise<Games[]> {
    const opts: FindManyOptions<Games> = {}

    return await this.GamesRepository.find(opts)
  }
}
