import {Injectable} from "@nestjs/common";
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
}
