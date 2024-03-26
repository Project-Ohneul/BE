import {Module} from "@nestjs/common";
import {MoodService} from "./moods.service";
import {MoodController} from "./moods.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Moods} from "./moods.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Moods])],
  providers: [MoodService],
  exports: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}
