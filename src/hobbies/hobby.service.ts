import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Hobbies} from "./hobby.entity";
import {UserHobby} from "src/user-hobby/user-hobby.entity";
import {UserHobbyService} from "src/user-hobby/user-hobby.service";

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobbies)
    private readonly hobbyRepository: Repository<Hobbies>,

    @InjectRepository(UserHobby)
    private readonly userHobbyRepository: Repository<UserHobby>
  ) {}

  async createHobby({hobby}) {
    return await this.hobbyRepository.save({
      hobby,
    });
  }

  async getAllHobbies(): Promise<Hobbies[]> {
    return await this.hobbyRepository.find();
  }

  async deleteHobboy(hobby_id: number): Promise<void> {
    await this.userHobbyRepository.delete({hobby_id});

    const result = await this.hobbyRepository.delete({hobby_id});

    if (result.affected === 0) {
      throw new NotFoundException(`해당 취미를 찾을 수 없습니다.`);
    }
  }

  async updateHobby(hobby_id: number, updateHobby: string): Promise<void> {
    const hobby = await this.hobbyRepository.findOne({where: {hobby_id}});

    if (!hobby) {
      throw new NotFoundException(`해당 취미를 찾을 수 없습니다.`);
    }

    hobby.hobby = updateHobby;

    await this.hobbyRepository.save(hobby);
  }
}
