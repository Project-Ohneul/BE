import {SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody} from "@nestjs/websockets";
import {Server} from "socket.io";
import {OnModuleInit} from "@nestjs/common";

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on("connection", (socket) => {
      console.log(socket.id);
      console.log("connected");
    });
  }

  @SubscribeMessage("newMessage")
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit("onMessage", {
      message: "새로운 메시지가 도착했습니다.",
      content: body,
    });
  }
}
