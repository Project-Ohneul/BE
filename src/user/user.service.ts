import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {Hobbies} from "src/hobbies/hobby.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Hobbies)
    private readonly hobbyRepository: Repository<Hobbies>
  ) {}

  async createUser({username, phone, birth, gender, coin, score, hobby_ids, mood_id, theme_id}): Promise<{status: number; message: string}> {
    let hobbies = [];

    if (hobby_ids && Array.isArray(hobby_ids)) {
      for (const hobby_id of hobby_ids) {
        const hobby = await this.hobbyRepository.findOne(hobby_id);
        if (hobby) {
          hobbies.push(hobby);
        } else {
          throw new NotFoundException(`해당 hobby를 찾을 수 없습니다. -> id: ${hobby_id}`);
        }
      }
    }

    const user = await this.userRepository.save({
      username,
      phone,
      birth,
      gender,
      coin,
      score,
      mood_id,
      theme_id,
      hobbies,
    });

    return {status: 200, message: "사용자가 생성되었습니다."};
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({relations: ["hobbies"]});
  }

  async getOneUser(user_id: number): Promise<User> {
    return await this.userRepository.findOne({where: {user_id}, relations: ["hobbies"]});
  }

  async deleteOneUser(user_id: number): Promise<void> {
    const user = await this.userRepository.findOne({where: {user_id}, relations: ["hobbies"]});

    if (!user) {
      throw new NotFoundException(`해당 유저를 찾을 수 없습니다.`);
    }

    await this.userRepository.remove(user);
  }

  async updateUserInfo(user_id: number, updateUserInfo: Partial<User>): Promise<void> {
    const user = await this.userRepository.findOne({where: {user_id}});

    if (!user) {
      throw new NotFoundException(`해당 사용자를 찾을 수 없습니다.`);
    }

    await this.userRepository.update(user_id, updateUserInfo);
  }
}
