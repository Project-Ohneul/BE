import { Injectable } from "@nestjs/common";
import { Notices } from "./notices.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notices)
    private noticesRepository: Repository<Notices>
  ) {}

  async postNotice(body) {
    await await this.noticesRepository.save(body);
  }

  async getAllNotice() {
    return await this.noticesRepository.find({});
  }
}
