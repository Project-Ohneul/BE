import {Injectable} from "@nestjs/common";
import {Socket} from "socket.io";

@Injectable()
export class ChatService {
  private chatRooms: Map<string, Socket[]> = new Map<string, Socket[]>();

  constructor() {}

  // chatRooms는 사용자가 입력한 주제로 key값을 설정하고 접속한 socket 즉 사용자(소켓)이 주제를 입력하면 주제: key, value : 고유 socket으로 저장됨
  // chatRooms는 방 관련 로직을 서리하기 위한 것
  // createChatRoom은 위 chatRooms를 바탕으로 방 이름값을 체크한 후 중복 방이 존재할 경우 랜덤값을 부여하여 사용자가 입력한 주제에 맞는 방에 소켓을 넣어주는 로직
  createChatRoom(socket: Socket, theme: string): void {
    let existingRoom: string | undefined;

    // 공간이 있는 기존 방이 있는지 확인합니다.
    for (const [roomName, room] of this.chatRooms.entries()) {
      if (room.length < 2) {
        existingRoom = roomName;
        break;
      }
    }

    // 만약 공간이 있는 기존 방이 있다면, 그 방에 소켓을 추가합니다.
    if (existingRoom) {
      const room = this.chatRooms.get(existingRoom);
      room.push(socket);
      socket.join(existingRoom);
      if (room.length === 2) {
        // 방에 있는 두 사용자에게 대화를 시작할 수 있다는 것을 알립니다.
        socket.to(existingRoom).emit("start");
        // socket.emit('start');
      } else {
        // 사용자에게 다른 참여자를 기다리고 있다는 것을 알립니다.
        socket.to(existingRoom).emit("wait");
        // socket.emit('wait');
      }
      console.log(`${socket.id} 사용자가 주제 ${theme}에 대한 기존 채팅방 ${existingRoom}에 참여했습니다.`);
    } else {
      // 공간이 있는 기존 방이 없다면, 새로운 방을 생성합니다.
      const roomName = this.generateUniqueRoomName(theme);
      this.chatRooms.set(roomName, [socket]);
      socket.join(roomName);
      // 사용자에게 다른 참여자를 기다리고 있다는 것을 알립니다.
      socket.emit("wait");
      console.log(`${socket.id} 사용자가 주제 ${theme}에 대한 새로운 채팅방 ${roomName}을 생성하고 참여했습니다.`);
    }

    // console.log('Current chat rooms:', this.chatRooms);
  }

  deleteChatRoom(socket: Socket): void {
    for (const [roomName, room] of this.chatRooms.entries()) {
      const index = room.indexOf(socket);
      if (index !== -1) {
        room.splice(index, 1);
        socket.leave(roomName);
        if (room.length === 0) {
          this.chatRooms.delete(roomName);
          console.log(`채팅방 ${roomName}이 삭제되었습니다.`);
        }
        break;
      }
    }
  }

  private generateUniqueRoomName(theme: string): string {
    let roomName: string;
    do {
      const randomValue = Math.random().toString(36).substring(7);
      roomName = theme + randomValue;
    } while (this.chatRooms.has(roomName));
    return roomName;
  }
}
