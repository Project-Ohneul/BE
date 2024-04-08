import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/user.entity";
import { v4 as uuidv4 } from "uuid";

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

  async updateScore({ user_id, score }) {
    const user = await this.usersRepository.findOne({
      where: { user_id },
    });

    console.log("user: ", user);
    const currentScore = user.score;
    const currentScoreAmount = user.score_amount;
    if (currentScoreAmount === 0) {
      await this.updateUser(user_id, { score, score_amount: 1 });
    } else if (currentScoreAmount >= 1) {
      const average =
        (currentScore * currentScoreAmount + score) / (currentScoreAmount + 1);
      console.log(average);

      await this.usersRepository.update(user_id, {
        score: average,
        score_amount: currentScoreAmount + 1,
      });
    }
  }
}
