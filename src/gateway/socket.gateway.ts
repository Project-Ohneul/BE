import {SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, OnGatewayDisconnect} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {OnModuleInit} from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000"],
  },
})
export class MyGateway implements OnModuleInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on("connection", (socket) => {
      console.log(socket.id);
      console.log(`${socket.id}님이 연결되었습니다.`);
    });
  }
  //  sendMessage:발신 이벤트, receiveMessage:수신 이벤트
  @SubscribeMessage("sendMessage")
  onSendMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit("receiveMessage", {
      message: "새로운 메시지가 도착했습니다.",
      content: body,
    });
  }

  handleDisconnect(socket: Socket) {
    console.log(`${socket.id}님의 연결이 끊겼습니다.`);
  }
}
