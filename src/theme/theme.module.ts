import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Themes} from "./theme.entity";
import {ThemeService} from "./theme.service";
import {ThemeController} from "./theme.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Themes])],
  providers: [ThemeService],
  exports: [ThemeService],
  controllers: [ThemeController],
})
export class ThemeModule {}
