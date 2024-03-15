import {Body, Controller, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {UserHobbyService} from "./user-hobby.service";
import {UserHobby} from "./user-hobby.entity";

@Controller("user-hobby")
export class UserHobbyController {
  constructor(private userHobbyService: UserHobbyService) {}

  @Get("/:user_id")
  async getOneUserHobby(@Param("user_id", ParseIntPipe) user_id: number): Promise<UserHobby[]> {
    return this.userHobbyService.getOneUserHobby(user_id);
  }

  @Post("join")
  async postUserHobby(@Body("user_id") user_id: number, @Body("hobby_id") hobby_id: number, @Body("username") username: string) {
    return await this, this.userHobbyService.postUserHobby({user_id, hobby_id, username});
  }
}
