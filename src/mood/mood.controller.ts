import {Body, Controller, Post} from "@nestjs/common";
import {MoodService} from "./mood.service";

@Controller("moods")
export class MoodController {
  constructor(private moodService: MoodService) {}

  @Post("join")
  async createMood(@Body("mood") mood: string) {
    return await this.moodService.createMood({mood});
  }
}
