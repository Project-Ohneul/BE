import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser({username, phone, birth, gender, coin, score, hobby_id, mood_id, theme_id}) {
    return await this.userRepository.save({
      username,
      phone,
      birth,
      gender,
      coin,
      score,
      hobby_id,
      mood_id,
      theme_id,
    });
  }
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  //   async findByUsername(username: string): Promise<User> | undefined {
  //     return this.userRepository.findOne({username});
  //   }
}
