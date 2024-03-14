import {Controller, Body, Post} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("join")
  async createUser(
    @Body("username") username: string,
    @Body("phone") phone: string,
    @Body("birth") birth: Date,
    @Body("gender") gender: string,
    @Body("coin") coin: number,
    @Body("score") score: number,
    @Body("hobby_id") hobby_id: number,
    @Body("mood_id") mood_id: number,
    @Body("theme_id") theme_id: number
  ) {
    return await this.userService.createUser({username, phone, birth, gender, coin, score, hobby_id, mood_id, theme_id});
  }
}
