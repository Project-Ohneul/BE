import {Module} from "@nestjs/common";
import {MyGateway} from "./chat.gateway";
import {ChatService} from "./chat.service";

@Module({
  providers: [MyGateway, ChatService],
})
export class GatewayModule {}
