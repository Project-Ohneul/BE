import {Controller, Post, Body, Get} from "@nestjs/common";
import {HobbyService} from "./hobby.service";
import {Hobbies} from "./hobby.entity";

@Controller("hobbies")
export class HobbyController {
  constructor(private hobbyService: HobbyService) {}

  @Post("join")
  async createHobby(@Body("hobby") hobby: string) {
    return await this.hobbyService.createHobby({hobby});
  }

  @Get()
  async getAllHobbies(): Promise<Hobbies[]> {
    return this.hobbyService.getAllHobbies();
  }
}
