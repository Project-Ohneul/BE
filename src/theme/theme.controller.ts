import {Body, Controller, Post, Get} from "@nestjs/common";
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
}
