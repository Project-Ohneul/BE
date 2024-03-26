import {Module} from "@nestjs/common";
import {OrderController} from "./orders.controller";
import {OrderService} from "./orders.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./orders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
