import {Injectable} from "@nestjs/common";
import {Socket} from "socket.io";

@Injectable()
export class ChatService {
  private chatRooms: Map<string, Socket[]> = new Map<string, Socket[]>();

  constructor() {}

  // Create chat room or join existing one based on theme
  createChatRoom(socket: Socket, theme: string): void {
    // console.log(
    //     'user selected theme',
    //     theme,
    //     socket.id,
    //     'dasdarooms',
    //     socket.rooms,
    //     'this.chatRooms',
    //     this.chatRooms
    // );

    let roomName: string | undefined;
    // 방 안에 몇명 있는지 체크

    for (const [name, room] of this.chatRooms.entries()) {
      // console.log('print room name', room, name);
      if (room.length < 2) {
        roomName = name;
        // if (room.length === 0) {
        //   socket.in(roomName).emit('wait')
        //   console.log('wait check')
        // } else {
        //   socket.in(roomName).emit('start')
        //   console.log('start check')
        // }
        break;
      }
    }

    if (!roomName) {
      // 이용 가능한 . 방없으면 주제 + 랜덤값 방 생성
      roomName = this.generateUniqueRoomName(theme);
    }

    // 유저 방에 넣기
    const room = this.chatRooms.get(roomName) || [];
    room.push(socket);
    this.chatRooms.set(roomName, room);

    socket.join(roomName);

    // Emit 'wait' event if the room has only one participant
    if (room.length === 1) {
      socket.to(roomName).emit("wait");
      console.log("-----waiting----");
    } else if (room.length === 2) {
      socket.to(roomName).emit("start");
      // socket.emit('start');
      console.log("-----start----");
    }

    const numberOfPeopleInRoom = this.chatRooms.get(roomName)?.length;
    console.log(`${socket.id} joined chat room for theme: ${theme}. Number of people in the room: ${numberOfPeopleInRoom}`);
  }

  deleteChatRoom(socket: Socket): void {
    for (const [roomName, room] of this.chatRooms.entries()) {
      const index = room.indexOf(socket);
      if (index !== -1) {
        room.splice(index, 1);
        socket.leave(roomName);
        if (room.length === 0) {
          this.chatRooms.delete(roomName);
          console.log(`Chat room ${roomName} has been deleted.`);
        }
        break;
      }
    }
  }

  // Generate a unique room name based on the theme
  private generateUniqueRoomName(theme: string): string {
    let roomName: string;
    do {
      // Append a random value to the theme to create a room name
      const randomValue = Math.random().toString(36).substring(7);
      roomName = theme + randomValue;
    } while (this.chatRooms.has(roomName));
    return roomName;
  }
}
