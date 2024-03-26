import { Module } from "@nestjs/common";
import { PaymentController } from "./payments.controller";
import { PaymentService } from "./payments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./payments.entity";
import { Order } from "src/orders/orders.entity";
import { Users } from "src/users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, Users])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
