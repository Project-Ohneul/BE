import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("join")
  async create(@Body() body) {
    console.log(body);
    await this.usersService.create(body);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const allUser = await this.usersService.findAll();
    res.json(allUser);
  }

  @Get(":id")
  async findUser(@Res() res: Response, @Param() param) {
    const user = await this.usersService.findUser(param);
    res.json(user);
  }

  @Patch("/score")
  async updateScore(@Body() body) {
    await this.usersService.updateScore(body);
  }

  @Patch(":id")
  async updateUser(@Param() param, @Body() updateData) {
    await this.usersService.updateUser(param.id, updateData);
  }

  @Delete(":id")
  async deleteUser(@Param() param) {
    await this.usersService.deleteUser(param.id);
  }
}
