import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "src/user/user.entity";
import {Payment} from "./payment.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}
}
