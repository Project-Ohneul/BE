import {Module} from "@nestjs/common";
import {MoodService} from "./mood.service";
import {MoodController} from "./mood.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Moods} from "./mood.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Moods])],
  providers: [MoodService],
  exports: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}
