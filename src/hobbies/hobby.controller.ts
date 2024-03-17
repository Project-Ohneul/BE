import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put, NotFoundException} from "@nestjs/common";
import {HobbyService} from "./hobby.service";
import {Hobbies} from "./hobby.entity";
import {NotFoundError} from "rxjs";

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

  @Delete("/:hobby_id")
  async deleteOneMood(@Param("hobby_id", ParseIntPipe) hobby_id): Promise<string> {
    await this.hobbyService.deleteHobboy(hobby_id);
    return `해당 감정을 삭제하였습니다. -> id: ${hobby_id}`;
  }

  @Put("/:hobby_id")
  async updateHobby(@Param("hobby_id") hobby_id: number, @Body("hobby") updateHobby: string): Promise<string> {
    try {
      await this.hobbyService.updateHobby(hobby_id, updateHobby);
      return `해당 취미가 수정되었습니다. -> hobby: ${updateHobby}`;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
