import {Body, Controller, Post} from "@nestjs/common";
import {ThemeService} from "./theme.service";

@Controller("themes")
export class ThemeController {
  constructor(private themeService: ThemeService) {}

  @Post("join")
  async createTheme(@Body("theme") theme: string) {
    return await this.themeService.createTheme({theme});
  }
}
