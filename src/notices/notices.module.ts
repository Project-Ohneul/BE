import { Module } from "@nestjs/common";
import { NoticesService } from "./notices.service";
import { NoticesController } from "./notices.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notices } from "./notices.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notices])],
  providers: [NoticesService],
  controllers: [NoticesController],
})
export class NoticesModule {}
