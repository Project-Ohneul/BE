import {Controller, Body, Post, Get, Delete, ParseIntPipe, Param, Patch} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user.entity";

@Controller("users")
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
    @Body("hobby_ids") hobby_ids: number[],
    @Body("mood_id") mood_id: number,
    @Body("theme_id") theme_id: number
  ) {
    return await this.userService.createUser({username, phone, birth, gender, coin, score, hobby_ids, mood_id, theme_id});
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get("/:user_id")
  async getOneUser(@Param("user_id", ParseIntPipe) user_id): Promise<User> {
    return this.userService.getOneUser(user_id);
  }

  @Delete("/:user_id")
  async deleteOneUser(@Param("user_id", ParseIntPipe) user_id): Promise<{status: number; message: string}> {
    await this.userService.deleteOneUser(user_id);
    return {status: 200, message: "해당 유저를 삭제하였습니다."};
  }

  @Patch("/:user_id")
  async updateUserInfo(@Param("user_id") user_id: number, @Body() updateUserData: any) {
    await this.userService.updateUserInfo(user_id, updateUserData);
    return `${user_id}의 정보가 변경되었습니다.`;
  }
}
