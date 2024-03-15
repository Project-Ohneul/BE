import {Body, Controller, Post, Get, ParseIntPipe, Delete, Param} from "@nestjs/common";
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
}
