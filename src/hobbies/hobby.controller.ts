import {Controller, Post, Body} from "@nestjs/common";
import {HobbyService} from "./hobby.service";

@Controller("hobbies")
export class HobbyController {
  constructor(private hobbyService: HobbyService) {}

  @Post("join")
  async createHobby(@Body("hobby") hobby: string) {
    return await this.hobbyService.createHobby({hobby});
  }
}
