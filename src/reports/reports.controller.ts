import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ReportsService } from "./reports.service";

@Controller("api/reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  async getAllReport(@Res() res) {
    const allReport = await this.reportsService.getAllReport();
    return res.json(allReport);
  }

  @Get(":id")
  async getOneReport(@Param("id") param, @Res() res) {
    const report = await this.reportsService.getOneReport(param);
    return res.json(report);
  }

  @Post()
  async postReport(@Body() body) {
    const { user_id, reason } = body;
    await this.reportsService.postReport(user_id, reason);
  }
}
