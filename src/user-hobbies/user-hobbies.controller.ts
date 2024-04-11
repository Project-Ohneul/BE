import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { UserHobbyService } from "./user-hobbies.service";
import { UserHobby } from "./user-hobbies.entity";

@Controller("user-hobby")
export class UserHobbyController {
  constructor(private userHobbyService: UserHobbyService) {}

  @Get("/:user_id")
  async getOneUserHobby(
    @Param("user_id") user_id: string
  ): Promise<UserHobby[]> {
    return this.userHobbyService.getOneUserHobby(user_id);
  }

  @Post("join")
  async postUserHobby(
    @Body("user_id") user_id: string,
    @Body("hobby_id") hobby_id: number[]
  ): Promise<{ status: number; message: string }> {
    await this.userHobbyService.postUserHobby({ user_id, hobby_id });
    return {
      status: 200,
      message: "해당 유저의 취미가 성공적으로 담겼습니다.",
    };
  }
}
