import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VisitHistory} from "./visit-history.entity";
import {Repository} from "typeorm";
import {Users} from "../users/entities/user.entity";

@Injectable()
export class VisitHistoryService {
  constructor(
    @InjectRepository(VisitHistory)
    private visitHistoryRepository: Repository<VisitHistory>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async postVisitHistory(user_id) {
    await this.visitHistoryRepository.save({user_id});
    const visitHistory = await this.visitHistoryRepository.findOne({
      where: {user_id},
    });
    await this.visitHistoryRepository.update(
      {user_id},
      {
        count: visitHistory.count + 1,
      }
    );

    const user = await this.usersRepository.findOne({
      where: {user_id},
    });

    await this.usersRepository.update(user_id, {coin: user.coin + 5});
  }

  async updateVisitHistory(user_id, res) {
    const visitHistory = await this.visitHistoryRepository.findOne({
      where: {user_id},
    });
    console.log(visitHistory);
    const updatedAt = visitHistory.updated_at;

    const updatedAtYear = updatedAt.getFullYear();
    const updatedAtMonth = ("0" + (updatedAt.getMonth() + 1)).slice(-2);
    const updatedAtDay = ("0" + updatedAt.getDate()).slice(-2);

    const updatedAtToNumber = Number(updatedAtYear + updatedAtMonth + updatedAtDay);

    const today = new Date();
    console.log("today: ", today);

    const todayYear = today.getFullYear();
    const todayMonth = ("0" + (today.getMonth() + 1)).slice(-2);
    const todayDay = ("0" + today.getDate()).slice(-2);
    const dateToNumber = Number(todayYear + todayMonth + todayDay);

    if (updatedAtToNumber === dateToNumber) {
      res.cookie("reward", "F");
      return;
    } else if (updatedAtToNumber < dateToNumber) {
      const user = await this.usersRepository.findOne({
        where: {user_id},
      });

      await this.visitHistoryRepository.update(
        {user_id},
        {
          count: visitHistory.count + 1,
        }
      );

      await this.usersRepository.update(user_id, {coin: user.coin + 5});
      res.cookie("reward", "T");
    }
  }

  async getOneVisitHistory(user_id) {
    return this.visitHistoryRepository.findOne({
      where: {user_id},
    });
  }
}
