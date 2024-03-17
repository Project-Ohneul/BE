import {Injectable, NotFoundException} from "@nestjs/common";
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

  async getOneUser(user_id: number): Promise<User> {
    return await this.userRepository.findOne({where: {user_id}});
  }

  async deleteOneUser(user_id: number): Promise<void> {
    const result = await this.userRepository.delete(user_id);

    if (result.affected === 0) {
      throw new NotFoundException(`해당 유저를 찾을 수 없습니다. -> id:${user_id}`);
    }
  }

  async updateUserInfo(user_id: number, updateUserInfo: Partial<User>): Promise<void> {
    const user = await this.userRepository.findOne({where: {user_id}});

    if (!user) {
      throw new NotFoundException(`해당 사용자를 찾을 수 없습니다. -> id: ${user_id}`);
    }

    await this.userRepository.update(user_id, updateUserInfo);
  }
}
