import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Hobbies} from "./hobby.entity";

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobbies)
    private readonly hobbyRepository: Repository<Hobbies>
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
    const result = await this.hobbyRepository.delete(hobby_id);

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
