import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { Server } from "socket.io";

@Injectable()
export class ChatService {
  private chatRooms: Map<string, Socket[]> = new Map<string, Socket[]>();

  constructor() {}

  createChatRoom(socket: Socket, theme: string, server: Server): void {
    let existingRoom: string | undefined;

    for (const [roomName, room] of this.chatRooms.entries()) {
      if (room.length < 2 && roomName.startsWith(theme)) {
        existingRoom = roomName;
        break;
      }
    }

    if (existingRoom) {
      const room = this.chatRooms.get(existingRoom);
      room.push(socket);
      socket.join(existingRoom);
      if (room.length === 2) {
        server.to(existingRoom).emit("start");
      } else {
        socket.emit("wait");
      }
      console.log(
        `${socket.id} joined existing chat room ${existingRoom} for theme ${theme}.`
      );
    } else {
      const roomName = this.generateUniqueRoomName(theme);
      this.chatRooms.set(roomName, [socket]);
      socket.join(roomName);
      socket.emit("wait");
      console.log(
        `${socket.id} created and joined new chat room ${roomName} for theme ${theme}.`
      );
    }
  }

  deleteChatRoom(socketId: string, server: Server) {
    console.log("delete chatroom entries", this.chatRooms.entries());
    for (const [roomName, room] of this.chatRooms.entries()) {
      console.log("user order delete", socketId, "rcheck geonoroom", roomName);
      const index = room.findIndex((socket) => socket.id === socketId);
      if (index !== -1) {
        room.splice(index, 1);
        if (room.length === 1) {
          this.chatRooms.delete(roomName);
          server.in(roomName).emit("finish"); // 대화 종료 알림
          server.in(roomName).disconnectSockets(true);

          console.log(`Chat room ${roomName} has been deleted.`);
        }
        break;
      }
    }
    // console.log('check roomname',getRoomName)
    // return getRoomName
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
