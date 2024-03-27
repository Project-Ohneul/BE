import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async create(body) {
    await this.usersRepository.save(body);
  }

  async createBySocialLogin(body) {
    console.log("service body:", body);
    const { provider_id, gender, username, birth, accessToken, refreshToken } =
      body;
    await this.usersRepository.save({
      provider_id,
      username,
      gender,
      birth,
    });
  }

  async findAll() {
    const allUser = await this.usersRepository.find({});
    console.log(allUser);
    return allUser;
  }

  async findUser(id) {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
    });
    return user;
  }

  async findUserToProviderId(id) {
    const user = await this.usersRepository.findOne({
      where: { provider_id: id },
    });
    return user;
  }

  async updateUser(id, updateData) {
    // const user = await this.findUser(id);
    await this.usersRepository.update(id, updateData);
  }

  async deleteUser(id) {
    await this.usersRepository.delete({ user_id: id });
  }
}
