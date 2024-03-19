import {Injectable} from "@nestjs/common";
import {Socket} from "socket.io";

@Injectable()
export class ChatService {
  private chatRooms: Map<string, Socket[]> = new Map<string, Socket[]>();

  constructor() {}
  // 채팅방 생성
  createChatRoom(socket: Socket, theme: string): void {
    let room = this.chatRooms.get(theme);

    if (!room || room.length === 0) {
      room = [socket];
      this.chatRooms.set(theme, room);
    } else if (room.length === 1) {
      room.push(socket);
      this.matchUsersToChatRoom(room, theme);
    } else {
      room = [socket];
      const roomId = Math.random().toString(36).substring(7);
      this.chatRooms.set(roomId, room);
    }

    socket.join(theme);
    console.log(`${theme}에 대한 채팅방이 생성되었습니다.`);
  }
  // 채팅방 삭제
  deleteChatRoom(socket: Socket): void {
    for (const [theme, room] of this.chatRooms.entries()) {
      const index = room.indexOf(socket);
      if (index !== -1) {
        room.splice(index, 1);
        socket.leave(theme);
        if (room.length === 0) {
          this.chatRooms.delete(theme);
          console.log(`${theme}에 대한 채팅방이 삭제되었습니다.`);
        }
        break;
      }
    }
  }
  // 주제에 따른 사용자 매칭
  private matchUsersToChatRoom(users: Socket[], theme: string): void {
    const roomId = Math.random().toString(36).substring(7);
    for (const user of users) {
      user.leave(theme);
      user.join(roomId);
    }
    this.chatRooms.delete(theme);
    console.log(`${roomId} 방에 매칭되었습니다.`);
  }
}
