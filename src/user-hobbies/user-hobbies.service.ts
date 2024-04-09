import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from "../users/entities/user.entity";
import {UserHobby} from "./user-hobbies.entity";

@Injectable()
export class UserHobbyService {
  constructor(
    @InjectRepository(UserHobby)
    private readonly userHobbyRepository: Repository<UserHobby>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>
  ) {}

  async getOneUserHobby(user_id: string): Promise<UserHobby[]> {
    const userHobbies = await this.userHobbyRepository.find({
      where: {user_id},
    });
    return userHobbies || [];
  }

  async postUserHobby({user_id, hobby_id}): Promise<{
    status: number;
    body: {user_id: string; hobby_id: number}[];
  }> {
    const user = await this.userRepository.findOne({where: {user_id}});

    if (!user) {
      throw new NotFoundException(`해당 유저가 없습니다.`);
    }

    await this.userHobbyRepository.delete({user_id});

    const savedUserHobbies = [];
    for (const hobbyId of hobby_id) {
      const savedUserHobby = await this.userHobbyRepository.save({
        user_id,
        hobby_id: hobbyId,
      });
      savedUserHobbies.push({hobby_id: savedUserHobby.hobby_id});
    }
    return {status: 200, body: savedUserHobbies};
  }
}

// async deleteUserHobby(user_id: number, hobby_id: number): Promise<void> {
//   const user = await this.userRepository.findOne({where: {user_id}});
//   if (!user) {
//     throw new NotFoundException(`해당 사용자의 취미를 찾을 수 없습니다.`);
//   }

//   const result = await this.userHobbyRepository.delete({user: user, hobby_id});

//   if (result.affected === 0) {
//     throw new NotFoundException(`해당 사용자의 취미를 찾을 수 없습니다.`);
//   }
// }

// async updateUserHobby(user_hobby_id: number, updateUserHobby: number): Promise<void> {
//   const userHobby = await this.userHobbyRepository.findOne({where: {user_hobby_id}});

//   if (!userHobby) {
//     throw new NotFoundException(`사용자의 취미 아이디를 찾을 수 없습니다. -> id: ${user_hobby_id}`);
//   }

//   userHobby.hobby_id = updateUserHobby;

//   await this.userHobbyRepository.save(userHobby);
// }
