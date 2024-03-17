import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserHobby} from "./user-hobby.entity";

@Injectable()
export class UserHobbyService {
  constructor(
    @InjectRepository(UserHobby)
    private readonly userHobbyRepository: Repository<UserHobby>
  ) {}

  async getOneUserHobby(user_id: number): Promise<UserHobby[]> {
    return await this.userHobbyRepository.find({where: {user_id: user_id}});
  }

  async postUserHobby({user_id, hobby_id, username}) {
    return await this.userHobbyRepository.save({
      user_id,
      hobby_id,
      username,
    });
  }
  // 얘는 뭘로 삭제해야하냐..?user_hobby_id?
  async deleteUserHobby(user_hobby_id: number): Promise<void> {
    const result = await this.userHobbyRepository.delete(user_hobby_id);

    if (result.affected === 0) {
      throw new NotFoundException(`사용자의 취미 아이디를 찾을 수 없습니다. -> id: ${user_hobby_id}`);
    }
  }

  async updateUserHobby(user_hobby_id: number, updateUserHobby: number): Promise<void> {
    const userHobby = await this.userHobbyRepository.findOne({where: {user_hobby_id}});

    if (!userHobby) {
      throw new NotFoundException(`사용자의 취미 아이디를 찾을 수 없습니다. -> id: ${user_hobby_id}`);
    }

    userHobby.hobby_id = updateUserHobby;

    await this.userHobbyRepository.save(userHobby);
  }
}
