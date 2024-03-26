import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Themes} from "./themes.entity";
import {ThemeService} from "./themes.service";
import {ThemeController} from "./themes.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Themes])],
  providers: [ThemeService],
  exports: [ThemeService],
  controllers: [ThemeController],
})
export class ThemeModule {}
