import {Module} from "@nestjs/common";
import {PaymentController} from "./payments.controller";
import {PaymentService} from "./payments.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Payment} from "./payments.entity";
import {Order} from "src/orders/orders.entity";
import {User} from "src/users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, User])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
