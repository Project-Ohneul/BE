import {Body, Controller, Post, Get, Delete, Put, ParseIntPipe, Param, NotFoundException} from "@nestjs/common";
import {ThemeService} from "./theme.service";
import {Themes} from "./theme.entity";

@Controller("themes")
export class ThemeController {
  constructor(private themeService: ThemeService) {}

  @Post("join")
  async createTheme(@Body("theme") theme: string) {
    return await this.themeService.createTheme({theme});
  }

  @Get()
  async getAllThemes(): Promise<Themes[]> {
    return await this.themeService.getAllThemes();
  }

  @Delete("/:theme_id")
  async deleteOneTheme(@Param("theme_id", ParseIntPipe) theme_id): Promise<string> {
    await this.themeService.deleteOneTheme(theme_id);
    return `해당 주제를 삭제하였습니다. -> id: ${theme_id}`;
  }

  @Put("/:theme_id")
  async updateTheme(@Param("theme_id") theme_id: number, @Body("theme") updateTheme: string): Promise<string> {
    try {
      await this.themeService.updateTheme(theme_id, updateTheme);
      return `해당 주제가 수정되었습니다. -> theme: ${updateTheme}`;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
