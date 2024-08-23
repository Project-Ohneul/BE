import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { NoticesService } from "./notices.service";

@Controller("api/notices")
export class NoticesController {
  constructor(private noticesService: NoticesService) {}

  @Post()
  async postNotice(@Body() body, @Res() res) {
    await this.noticesService.postNotice(body);
    res.status(200).send("공지사항 등록이 완료되었습니다.");
  }

  @Get()
  async getAllNotice(@Res() res) {
    const notices = await this.noticesService.getAllNotice();

    res.json(notices);
  }
}
