import {Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
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
  async postUserHobby(@Body("user_id") user_id: number, @Body("hobby_id") hobby_id: number[]): Promise<{status: number; message: string}> {
    await this.userHobbyService.postUserHobby({user_id, hobby_id});
    return {status: 200, message: "해당 유저의 취미가 성공적으로 담겼습니다."};
  }
}

// @Delete(":user_id/:hobby_id")
// async deleteUserHobby(
//   @Param("user_id", ParseIntPipe) user_id: number,
//   @Param("hobby_id", ParseIntPipe) hobby_id: number
// ): Promise<{status: number; message: string}> {
//   await this.userHobbyService.deleteUserHobby(user_id, hobby_id);
//   return {status: 200, message: "사용자의 취미를 삭제하였습니다."};
// }

// @Put("/:user_hobby_id")
// async updateUserHobby(@Param("user_hobby_id") user_hobby_id: number, @Body("hobby_id") updateUserHobby: number): Promise<string> {
//   try {
//     await this.userHobbyService.updateUserHobby(user_hobby_id, updateUserHobby);
//     return `사용자의 취미 아이디가 수정되었습니다.`;
//   } catch (error) {
//     throw new NotFoundException(error.message);
//   }
// }
