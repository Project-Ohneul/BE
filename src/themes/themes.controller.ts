import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  ParseIntPipe,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { ThemeService } from "./themes.service";
import { Themes } from "./themes.entity";

@Controller("api/themes")
export class ThemeController {
  constructor(private themeService: ThemeService) {}

  @Post("join")
  async createTheme(
    @Body("theme") theme: string
  ): Promise<{ status: number; message: string }> {
    await this.themeService.createTheme({ theme });
    return { status: 200, message: "주제가 성공적으로 생성되었습니다." };
  }

  @Get()
  async getAllThemes(): Promise<Themes[]> {
    return await this.themeService.getAllThemes();
  }

  @Delete("/:theme_id")
  async deleteOneTheme(
    @Param("theme_id", ParseIntPipe) theme_id
  ): Promise<{ status: number; message: string }> {
    await this.themeService.deleteOneTheme(theme_id);
    return { status: 200, message: "해당 주제를 삭제하였습니다." };
  }

  @Put("/:theme_id")
  async updateTheme(
    @Param("theme_id") theme_id: number,
    @Body("theme") updateTheme: string
  ): Promise<{ status: number; message: string }> {
    try {
      await this.themeService.updateTheme(theme_id, updateTheme);
      return { status: 200, message: "해당 주제가 수정되었습니다." };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
