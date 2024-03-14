import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Moods} from "./mood.entity";

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(Moods)
    private readonly moodRepository: Repository<Moods>
  ) {}

  async createMood({mood}) {
    return await this.moodRepository.save({
      mood,
    });
  }
  async getAllMoods(): Promise<Moods[]> {
    return await this.moodRepository.find();
  }
}
