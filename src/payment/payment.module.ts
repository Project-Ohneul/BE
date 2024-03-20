import {Module} from "@nestjs/common";
import {PaymentController} from "./payment.controller";
import {PaymentService} from "./payment.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Payment} from "./payment.entity";
import {Order} from "src/order/order.entity";
import {User} from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, User])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
