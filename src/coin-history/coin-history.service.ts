import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoinHistory } from "./coin-history.entity";
import { Repository } from "typeorm";

@Injectable()
export class CoinHistoryService {
  constructor(
    @InjectRepository(CoinHistory)
    private coinHistoryRepository: Repository<CoinHistory>
  ) {}

  async getUserCoinHistory(id) {
    console.log(id);
    return await this.coinHistoryRepository.find({
      where: { user_id: id },
    });
  }
  async postCoinHistory(id, used_coin) {
    await this.coinHistoryRepository.save({
      user_id: id,
      used_coin,
    });
  }
}
