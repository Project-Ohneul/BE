import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayDisconnect,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Body, OnModuleInit, Res } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Response } from "express";

// WebSocketGateway 데코레이터를 이용하여 WebSocketGateway 클래스를 정의합니다.
@WebSocketGateway({
  cors: {
    origin: ["https://port-0-ohneul-front-754g42alucwss46.sel5.cloudtype.app"], // CORS 설정: 클라이언트 주소
  },
})
export class MyGateway implements OnModuleInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // WebSocket 서버

  private userAgreementInfo = new Map<string, any>(); // 사용자 동의 정보를 저장할 Map

  constructor(private chatService: ChatService) {}

  // NestJS 모듈 초기화 시 호출되는 메서드
  onModuleInit() {
    // WebSocket 서버에 'connection' 이벤트 핸들러 등록
    this.server.on("connection", (socket: Socket) => {
      console.log(`${socket.id} connected.`); // 연결된 소켓의 ID를 로그에 출력
    });
  }

  // 클라이언트로부터 'sendMessage' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("sendMessage")
  onSendMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const rooms = this.server.sockets.adapter.sids.get(socket.id); // 소켓이 속한 방의 목록 가져오기
    // console.log('check rooms',rooms)
    if (!rooms) {
      console.log("No socket rooms."); // 소켓이 어떤 방에도 속해있지 않을 경우
      return;
    }

    // 방에 속한 모든 소켓에 메시지 전송
    rooms.forEach((_, room) => {
      if (room !== socket.id) {
        this.server.to(room).emit("receiveMessage", {
          userId: socket.id, // 수신자에게 표시될 메시지
          content: body, // 메시지 내용
        });
        // console.log('check room information'); // 방 정보 확인 로그
      }
    });
  }

  // 클라이언트로부터 'selectTheme' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("selectTheme")
  onSelectTheme(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    console.log("Client selected theme:", data); // 클라이언트가 선택한 주제 로그 출력
    const theme = data;
    // In your ChatGateway class
    this.chatService.createChatRoom(socket, theme, this.server); // Pass the server instance
    // 주제에 따른 채팅방 생성
    socket.emit("selectThemeSuccess"); // 클라이언트에게 주제 선택 성공 메시지 전송

    // 생성된 채팅방에 대한 처리
    const rooms = this.server.sockets.adapter.sids.get(socket.id);
    rooms.forEach((_, room) => {
      if (room !== socket.id) {
        const memberCount = this.server.sockets.adapter.rooms.get(room).size;
        if (memberCount === 1) {
          this.server.in(room).emit("wait"); // 대기 중인 상태로 설정
        } else {
          this.server.in(room).emit("start"); // 대화 시작
        }
      }
    });
    console.log("현재 존재하는 방 체크", this.server.sockets.adapter.rooms); // 현재 방 목록 확인 로그
  }

  // 클라이언트로부터 'consent' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("consent")
  onConsent(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    console.log("Consent received from:", socket.id, "Data:", data, "rooms"); // 동의 정보 수신 로그
    const rooms = this.server.sockets.adapter.sids.get(socket.id);

    if (!rooms) {
      console.log("No socket rooms."); // 소켓이 어떤 방에도 속해있지 않을 경우
      return;
    }
    const userAgreeData = new User(socket.id, data);

    // 방에 대한 처리
    rooms.forEach((_, room) => {
      if (room !== socket.id) {
        if (this.userAgreementInfo.has(room)) {
          this.userAgreementInfo.get(room).push(userAgreeData); // 동의 정보 저장
        } else {
          this.userAgreementInfo.set(room, [userAgreeData]);
        }

        // 두 사용자의 동의가 모두 왔을 경우
        if (this.userAgreementInfo.get(room).length === 2) {
          const user1Re = this.userAgreementInfo.get(room)[0].getAgree();
          const user2Re = this.userAgreementInfo.get(room)[1].getAgree();

          console.log("----------", user1Re, user2Re);
          if (user1Re === "agree" && user2Re === "agree") {
            // 두 사용자가 모두 동의한 경우
            console.log("love");
            this.server.in(room).emit("start"); // 대화 시작
            this.userAgreementInfo.delete(room); // 동의 정보 삭제
          } else {
            // 하나라도 동의하지 않은 경우
            console.log("fuck");
            this.server.in(room).emit("refuseConversation"); // 대화 거부 알림
            this.server.in(room).emit("finish"); // 대화 종료
            this.server.in(room).disconnectSockets(true); // 소켓 연결 끊기
            this.userAgreementInfo.delete(room); // 동의 정보 삭제
          }
        }
        console.log("check user agreement info", this.userAgreementInfo); // 동의 정보 확인 로그
      }
    });
  }

  // 클라이언트로부터 'userExit' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("userExit")
  disconnectRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const rooms = this.server.sockets.adapter.sids.get(socket.id);
    console.log("check rooms userexist", rooms);

    if (!rooms) {
      console.log("No socket rooms found."); // 소켓이 어떤 방에도 속해있지 않을 경우
      return;
    }

    rooms.forEach((_, room) => {
      console.log("find room", _, room); // 방 정보 확인 로그
      if (room !== socket.id) {
        this.server.in(room).emit("finish"); // 대화 종료 알림
        console.log("방삭제가 되는지 확인", room);
        this.server.in(room).disconnectSockets(true); // 소켓 연결 끊기
      }
    });
  }

  // 소켓 연결이 끊겼을 때의 핸들러
  handleDisconnect(socket: Socket) {
    const rooms = this.server.sockets.adapter.rooms;
    console.log("socket id 연결 끊어졌을떄 disconnect", socket.id, "--", rooms);
    this.chatService.deleteChatRoom(socket.id, this.server);

    // const userParticipatedRoomList = this.chatService.deleteChatRoom(socket.id)
    // userParticipatedRoomList.map(room => {
    //     console.log('방삭제가 되는지 확인 소켓 연결 끊길때',room)
    //     this.server.in(room).emit('finish'); // 대화 종료 알림
    //     this.server.in(room).disconnectSockets(true)
    // })
  }
}

class User {
  #username;
  #agree;
  constructor(username, agree) {
    this.#username = username;
    this.#agree = agree;
  }

  getUsername() {
    return this.#username;
  }

  getAgree() {
    return this.#agree;
  }
}
