import {Module} from "@nestjs/common";
import {PaymentController} from "./payments.controller";
import {PaymentService} from "./payments.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Payment} from "./payments.entity";
import {Users} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Users])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
