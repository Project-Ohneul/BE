import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hobbies} from "./hobby.entity";
import {HobbyService} from "./hobby.service";
import {HobbyController} from "./hobby.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Hobbies])],
  providers: [HobbyService],
  exports: [HobbyService],
  controllers: [HobbyController],
})
export class HobbyModule {}
