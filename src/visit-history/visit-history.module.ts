import { Module } from "@nestjs/common";
import { VisitHistoryService } from "./visit-history.service";
import { VisitHistoryController } from "./visit-history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VisitHistory } from "./visit-history.entity";
import { Users } from "src/users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([VisitHistory]),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [VisitHistoryService],
  controllers: [VisitHistoryController],
})
export class VisitHistoryModule {}
