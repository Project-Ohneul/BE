import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reports } from "./reports.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private reportsRepository: Repository<Reports>
  ) {}

  async getAllReport() {
    return await this.reportsRepository.find({});
  }

  async getOneReport(user_id) {
    return await this.reportsRepository.find({
      where: { user_id },
    });
  }

  async postReport(user_id, reason) {
    await this.reportsRepository.save({
      user_id,
      reason,
    });
  }
}
