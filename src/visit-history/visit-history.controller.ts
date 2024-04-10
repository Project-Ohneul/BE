import { Controller, Param, Patch, Post, Res } from "@nestjs/common";
import { VisitHistoryService } from "./visit-history.service";

@Controller("visit-history")
export class VisitHistoryController {
  constructor(private visitHistoryService: VisitHistoryService) {}

  @Post(":id")
  async postVisitHistory(@Param("id") param) {
    await this.visitHistoryService.postVisitHistory(param);
  }

  @Patch(":id")
  async updateVisitHistory(@Param("id") param) {
    await this.visitHistoryService.updateVisitHistory(param);
  }
}
