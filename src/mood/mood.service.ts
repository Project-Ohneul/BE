import {Injectable, NotFoundException} from "@nestjs/common";
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

  async deleteOneMood(mood_id: number): Promise<void> {
    const result = await this.moodRepository.delete(mood_id);

    if (result.affected === 0) {
      throw new NotFoundException(`해당 감정을 찾을 수 없습니다.`);
    }
  }

  async updateMood(mood_id: number, updateMood: string): Promise<void> {
    const mood = await this.moodRepository.findOne({where: {mood_id}});

    if (!mood) {
      throw new NotFoundException(`해당 감정을 찾을 수 없습니다.`);
    }

    mood.mood = updateMood;

    await this.moodRepository.save(mood);
  }
}
