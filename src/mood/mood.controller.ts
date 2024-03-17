import {Body, Controller, Post, Get, ParseIntPipe, Delete, Param, Put, NotFoundException} from "@nestjs/common";
import {MoodService} from "./mood.service";
import {Moods} from "./mood.entity";

@Controller("moods")
export class MoodController {
  constructor(private moodService: MoodService) {}

  @Post("join")
  async createMood(@Body("mood") mood: string) {
    return await this.moodService.createMood({mood});
  }

  @Get()
  async getAllMoods(): Promise<Moods[]> {
    return await this.moodService.getAllMoods();
  }

  @Delete("/:mood_id")
  async deleteOneMood(@Param("mood_id", ParseIntPipe) mood_id): Promise<string> {
    await this.moodService.deleteOneMood(mood_id);
    return `해당 감정을 삭제하였습니다. -> id: ${mood_id}`;
  }

  @Put("/:mood_id")
  async updateMood(@Param("mood_id") mood_id: number, @Body("mood") updateMood: string): Promise<string> {
    try {
      await this.moodService.updateMood(mood_id, updateMood);
      return `해당 감정이 수정되었습니다. -> mood: ${updateMood}`;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
