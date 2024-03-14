import {Injectable} from "@nestjs/common";
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
}
