import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  NotFoundException,
} from "@nestjs/common";
import { HobbyService } from "./hobbies.service";
import { Hobbies } from "./hobbies.entity";
import { NotFoundError } from "rxjs";

@Controller("api/hobbies")
export class HobbyController {
  constructor(private hobbyService: HobbyService) {}

  @Post("join")
  async createHobby(
    @Body("hobby") hobby: string
  ): Promise<{ status: number; message: string }> {
    await this.hobbyService.createHobby({ hobby });
    return { status: 200, message: "취미가 생성되었습니다." };
  }

  @Get()
  async getAllHobbies(): Promise<Hobbies[]> {
    return this.hobbyService.getAllHobbies();
  }

  @Delete("/:hobby_id")
  async deleteOneMood(
    @Param("hobby_id", ParseIntPipe) hobby_id
  ): Promise<{ status: number; message: string }> {
    await this.hobbyService.deleteHobboy(hobby_id);
    return { status: 200, message: "해당 취미가 삭제되었습니다." };
  }

  @Put("/:hobby_id")
  async updateHobby(
    @Param("hobby_id") hobby_id: number,
    @Body("hobby") updateHobby: string
  ): Promise<{ status: number; message: string }> {
    try {
      await this.hobbyService.updateHobby(hobby_id, updateHobby);
      return { status: 200, message: "해당 취미가 수정되었습니다." };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
