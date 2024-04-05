import { ReportsService } from "./../reports/reports.service";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayDisconnect,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Body, OnModuleInit } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { UsersService } from "src/users/users.service";

// WebSocketGateway 데코레이터를 이용하여 WebSocketGateway 클래스를 정의합니다.
@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000"], // CORS 설정: 클라이언트 주소
  },
})
export class MyGateway implements OnModuleInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // WebSocket 서버

  private userAgreementInfo = new Map<string, any>(); // 사용자 동의 정보를 저장할 Map
  private otherPartyUUIDs = new Map<string, any>();

  constructor(
    private chatService: ChatService,
    private usersService: UsersService,
    private reportsService: ReportsService
  ) {}

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
    socket.emit("connected", { message: "Connected to server" });
  }

  // NestJS 모듈 초기화 시 호출되는 메서드
  onModuleInit() {
    // WebSocket 서버에 'connection' 이벤트 핸들러 등록
    this.server.on("connection", (socket: Socket) => {
      console.log(`${socket.id} connected.`); // 연결된 소켓의 ID를 로그에 출력
    });
  }

  // @SubscribeMessage('login')
  // onlogin(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
  //     console.log('클라이언트에서 로그인 됬습니다.')
  //     this.server.emit('slogin',data)
  // }
  // 클라이언트로부터 'sendMessage' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("message")
  oexdMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    console.log(body);
    // socket.broadcast.emit('sMessage',body)
  }

  // 클라이언트로부터 'sendMessage' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("sendMessage")
  onSendMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const rooms = this.server.sockets.adapter.sids.get(socket.id); // 소켓이 속한 방의 목록 가져오기
    // console.log("보낸 메세지",body)
    // console.log('check rooms',rooms)
    if (!rooms) {
      console.log("No socket rooms."); // 소켓이 어떤 방에도 속해있지 않을 경우
      return;
    }

    // 방에 속한 모든 소켓에 메시지 전송
    rooms.forEach((_, room) => {
      if (room !== socket.id) {
        this.server.to(room).emit("receiveMessage", body);
        // console.log('상대방에게 보낼',body)
        // console.log('check room information'); // 방 정보 확인 로그
      }
    });
  }

  // 클라이언트로부터 'selectTheme' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("selectTheme")
  onSelectTheme(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const { userSelectTheme, uuid } = data;
    // In your ChatGateway class
    this.chatService.createChatRoom(socket, userSelectTheme, this.server); // Pass the server instance
    // 주제에 따른 채팅방 생성
    socket.emit("selectThemeSuccess"); // 클라이언트에게 주제 선택 성공 메시지 전송
    const rooms = this.server.sockets.adapter.sids.get(socket.id);

    rooms.forEach((_, room) => {
      if (room !== socket.id) {
        if (this.otherPartyUUIDs.has(room)) {
          this.otherPartyUUIDs.get(room).push({
            socketId: socket.id,
            uuid,
          });
        } else {
          this.otherPartyUUIDs.set(room, [
            {
              socketId: socket.id,
              uuid,
            },
          ]);
        }
      }
    });

    console.log("Stored other party's UUIDs:", this.otherPartyUUIDs);

    // 생성된 채팅방에 대한 처리
    rooms.forEach((_, room) => {
      if (room !== socket.id) {
        const memberCount = this.server.sockets.adapter.rooms.get(room).size;
        if (memberCount === 1) {
          this.server.in(room).emit("wait"); // 대기 중인 상태로 설정
        } else {
          // console.log('대화 시작 상대방 아이디는', socket.id, '--uuid--', this.otherPartyUUIDs.get(room));
          const otherId = this.otherPartyUUIDs
            .get(room)
            .filter((item) => item.socketId !== socket.id)[0].uuid;
          this.server.in(room).emit("start", otherId); // 대화 시작
          console.log("대화 시작");
        }
      }
    });
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
            this.chatService.handleAgreement(room, this.server);
          } else {
            // 하나라도 동의하지 않은 경우
            console.log("fuck");
            this.server.in(room).emit("refuseConversation"); // 대화 거부 알림
            this.server.in(room).emit("finish"); // 대화 종료
            // this.server.in(room).disconnectSockets(true); // 소켓 연결 끊기
            this.userAgreementInfo.delete(room); // 동의 정보 삭제
          }
        }
        console.log("check user agreement info", this.userAgreementInfo); // 동의 정보 확인 로그
      }
    });
  }

  // 상대 유저 신고
  @SubscribeMessage("reportUser")
  async onReportUser(@MessageBody() reportedUserId: any, reason: any) {
    // 클라이언트에서 주는 다른 유저(상대)의 user_id
    console.log(reportedUserId);
    // user_id 확인
    const getReportedUser = await this.usersService.findUser(reportedUserId);
    // 신고당하는 유저의 user_id가 있으면 report를 +1 하고, 저장

    if (getReportedUser) {
      await this.reportsService.postReport(reportedUserId, reason);
      await this.usersService.updateUser(reportedUserId, {
        report: getReportedUser.report + 1,
      });
    }
  }

  @SubscribeMessage("score")
  async updateScore(@MessageBody() userId: any, score: any) {
    await this.usersService.updateScore({ user_id: userId, score });
  }

  // // 상대 유저 신고
  // @SubscribeMessage("reportUser")
  // async onReportUser(@MessageBody() reportedUserId: any) {
  //   // 클라이언트에서 주는 다른 유저(상대)의 user_id
  //   console.log("신고 당한 사람 아이디", reportedUserId);
  //   const reportedUser = await this.usersService.findUser(reportedUserId);
  //   console.log("finduser", reportedUser);

  //   if (reportedUser) {
  //     reportedUserId.report += 1;
  //     await this.usersService.updateUser(reportedUser.user_id, {
  //       report: reportedUser.report,
  //     });
  //     console.log("신고 후 누적 체크", reportedUserId);
  //   }
  //   // function getReportUser(userId) {
  //   //     const user = await this.usersService.findUser(userId);
  //   //     console.log('uuid를 이용해 신고당한 사람 아이디 찾아오기');
  //   //     return user;
  //   // }

  //   // getReportUser(reportedUserId)

  //   // console.log('cehckj getReportUser', getReportUser(reportedUserId));

  //   // user_id 확인
  //   // const getReportedUser = await this.usersService.findUser(reportedUserId);
  //   // // 신고당하는 유저의 user_id가 있으면 report를 +1 하고, 저장

  //   // if (getReportedUser) {
  //   //     reportedUserId.report += 1;
  //   //     await this.usersService.updateUser(getReportedUser.user_id, {
  //   //         report: getReportedUser.report,
  //   //     });
  //   // }
  // }

  // 클라이언트로부터 'userExit' 메시지를 받았을 때의 핸들러
  @SubscribeMessage("userExit")
  disconnectRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const rooms = this.server.sockets.adapter.sids.get(socket.id);
    console.log("사용자의 나가기 누름 방 삭제전t", rooms);

    if (!rooms) {
      console.log("No socket rooms found."); // 소켓이 어떤 방에도 속해있지 않을 경우
      return;
    }

    rooms.forEach((_, room) => {
      console.log("find room", _, room); // 방 정보 확인 로그
      if (room !== socket.id) {
        this.server.in(room).emit("finish"); // 대화 종료 알림
        console.log("방삭제가 되는지 확인", room);
        // this.server.in(room).disconnectSockets(true); // 소켓 연결 끊기
        socket.leave(room);
        this.chatService.deleteChatRoom(
          socket.id,
          this.server,
          this.otherPartyUUIDs
        );
        console.log(
          "상대방 탈주 알림 이벤트",
          room,
          rooms,
          "현재 남아있는 방 리스트",
          this.server.sockets.adapter.rooms
        );
      }
    });
    console.log("삭제 후 rooms userexist", rooms);
  }

  // 소켓 연결이 끊겼을 때의 핸들러
  handleDisconnect(socket: Socket) {
    const rooms = this.server.sockets.adapter.rooms;
    console.log("socket id 연결 끊어졌을떄 disconnect", socket.id, "--", rooms);
    this.chatService.deleteChatRoom(
      socket.id,
      this.server,
      this.otherPartyUUIDs
    );

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
