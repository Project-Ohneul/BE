import {Body, Controller, Post, Get, ParseIntPipe, Delete, Param, Put, NotFoundException} from "@nestjs/common";
import {MoodService} from "./mood.service";
import {Moods} from "./mood.entity";

@Controller("moods")
export class MoodController {
  constructor(private moodService: MoodService) {}

  @Post("join")
  async createMood(@Body("mood") mood: string): Promise<{status: number; message: string}> {
    await this.moodService.createMood({mood});
    return {status: 200, message: "감정이 생성되었습니다."};
  }

  @Get()
  async getAllMoods(): Promise<Moods[]> {
    return await this.moodService.getAllMoods();
  }

  @Delete("/:mood_id")
  async deleteOneMood(@Param("mood_id", ParseIntPipe) mood_id): Promise<{status: number; message: string}> {
    await this.moodService.deleteOneMood(mood_id);
    return {status: 200, message: "해당 감정을 삭제하였습니다."};
  }

  @Put("/:mood_id")
  async updateMood(@Param("mood_id") mood_id: number, @Body("mood") updateMood: string): Promise<{status: number; message: string}> {
    try {
      await this.moodService.updateMood(mood_id, updateMood);
      return {status: 200, message: "해당 감정이 수정되었습니다."};
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
