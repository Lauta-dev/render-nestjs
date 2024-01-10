import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from 'src/entity/Games.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Games)
    private GamesRepository: Repository<Games>
  ) { }

  async getHello(): Promise<Games[]> {
    return await this.GamesRepository.find()
  }
}
