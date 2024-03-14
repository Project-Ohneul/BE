import {Body, Controller, Post, Get} from "@nestjs/common";
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
}
