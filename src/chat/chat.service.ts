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

  deleteChatRoom(socketId: string): string[] {
    let getRoomName = [];
    for (const [roomName, room] of this.chatRooms.entries()) {
      const index = room.findIndex((socket) => socket.id === socketId);
      if (index !== -1) {
        room.splice(index, 1);
        if (room.length === 0) {
          this.chatRooms.delete(roomName);
          console.log(`Chat room ${roomName} has been deleted.`);
        }
        break;
      }
    }
    return getRoomName;
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
