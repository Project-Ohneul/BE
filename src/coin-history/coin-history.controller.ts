import { Body, Param, Post, Req } from "@nestjs/common";
import { Controller, Get, Res } from "@nestjs/common";
import { CoinHistoryService } from "./coin-history.service";
import { Request, Response } from "express";

@Controller("coin-history")
export class CoinHistoryController {
  constructor(private coinHistoryService: CoinHistoryService) {}

  @Get(":id")
  async getUserCoinHistory(
    @Param("id") param,
    @Req() req: Request,
    @Res() res: Response
  ) {
    console.log(param);
    const history = await this.coinHistoryService.getUserCoinHistory(param);
    res.json(history);
  }

  @Post()
  async postCoinHistory(@Body() body) {
    const { id, used_coin } = body;
    await this.coinHistoryService.postCoinHistory(id, used_coin);
  }
}
