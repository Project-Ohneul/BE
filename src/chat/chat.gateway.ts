import {SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, OnGatewayDisconnect, ConnectedSocket} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {OnModuleInit} from "@nestjs/common";
import {ChatService} from "./chat.service";

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000"],
  },
})
export class MyGateway implements OnModuleInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}
  // socket 연결
  onModuleInit() {
    this.server.on("connection", (socket) => {
      console.log(`${socket.id}님이 연결되었습니다.`);
    });
  }

  @SubscribeMessage("sendMessage")
  onSendMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    console.log(body);
    this.server.emit("receiveMessage", {
      message: "상대방으로부터 새로운 메시지가 도착했습니다.",
      content: body,
    });
  }
  // 주제 선택
  @SubscribeMessage("selectTheme")
  onSelectTheme(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const {theme} = data;
    this.chatService.createChatRoom(socket, theme);
  }
  // 연결 끊김
  handleDisconnect(socket: Socket) {
    console.log(`${socket.id}님의 연결이 끊겼습니다.`);
    this.chatService.deleteChatRoom(socket);
  }
}
