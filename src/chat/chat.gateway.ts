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
      console.log("유저 접속시 상태 this.server.sockets.adapter", this.server.sockets.adapter.rooms);
    });
  }

  @SubscribeMessage("sendMessage")
  onSendMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    // console.log(
    //     'socket id',
    //     socket.id,
    //     'this server adapter rooms',
    //     this.server.sockets.adapter.rooms,
    //     'this server adapter sids',
    //     this.server.sockets.adapter.sids,
    //     {
    //         message: '상대방으로부터 새로운 메시지가 도착했습니다.',
    //         content: body,
    //     }.content
    // );

    const rooms = this.server.sockets.adapter.sids.get(socket.id);
    console.log("check rooms", rooms);

    if (!rooms) {
      console.log("소켓 방 없음.");
      return;
    }

    // 원래 각 소캣에 기본적으로 private룸이 주어짐 아무 방에 들어가지 않아도 쳐지는거 그래서 private 룸이면 메세지 안보내고 다른 방에만 메세지 보내게
    rooms.forEach((_, room) => {
      console.log("findromm", _, room);
      if (room !== socket.id) {
        this.server.to(room).emit("receiveMessage", {
          message: "상대방으로부터 새로운 메시지가 도착했습니다.",
          content: body,
        });
      }
    });
  }
  // 주제 선택
  @SubscribeMessage("selectTheme")
  onSelectTheme(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    console.log("client send theme", data);
    const theme = data;
    this.chatService.createChatRoom(socket, theme);
    socket.emit("selectThemeSuccess");

    const rooms = this.server.sockets.adapter.sids.get(socket.id);
    console.log("for find room participant", this.server.sockets.adapter.rooms.get(socket.id));
    console.log("for find room listz", this.server.sockets.adapter.rooms);

    const roomList = this.server.sockets.adapter.rooms;

    console.log("check rooms", rooms);

    function findNumPeople(roomId, data) {
      if (!data[roomId]) {
        return 0;
      }
      return data[roomId].size;
    }

    const numPeople = findNumPeople(socket.id, roomList);
    console.log(`There are ${numPeople} people in room ${socket.id}.`);
  }

  @SubscribeMessage("userExit")
  disconnectRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const rooms = this.server.sockets.adapter.sids.get(socket.id);

    rooms.forEach((_, room) => {
      console.log("findromm", _, room);

      if (room !== socket.id) {
        this.server.in(room).emit("finish");
        this.server.in(room).disconnectSockets(true);
        console.log("check discommected", this.server.sockets.adapter.rooms);
      }
    });
  }

  // // 주제 선택
  // @SubscribeMessage('wait')
  // onMessageWait(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {

  // }

  // // 주제 선택
  // @SubscribeMessage('start')
  // onMessageStart(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {

  // }

  // 연결 끊김
  handleDisconnect(socket: Socket) {
    console.log(`${socket.id}님의 연결이 끊겼습니다.`);
    this.chatService.deleteChatRoom(socket);
  }
}
