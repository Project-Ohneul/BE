import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { Server } from "socket.io";

@Injectable()
export class ChatService {
  private chatRooms: Map<string, Socket[]> = new Map<string, Socket[]>();
  private extendedTimes: Map<string, number> = new Map<string, number>();

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

  deleteChatRoom(socketId: string, server: Server, otherPartyUUIDs: any) {
    console.log("delete chatroom entries", this.chatRooms.entries());
    for (const [roomName, room] of this.chatRooms.entries()) {
      console.log("user order delete", socketId, "rcheck geonoroom", roomName);
      const index = room.findIndex((socket) => socket.id === socketId);
      if (index !== -1) {
        room.splice(index, 1);
        if (room.length === 1) {
          const remainingSocket = room[0]; // 마지막으로 남은 소켓
          server.in(roomName).emit("finish"); // 대화 종료 알림
          remainingSocket.leave(roomName); // 방에서 소켓 제거
          console.log("uuid 기록 삭제 전", otherPartyUUIDs);
          otherPartyUUIDs.delete(roomName);
          console.log("uuid 기록 삭제 후", otherPartyUUIDs);
          this.chatRooms.delete(roomName); // 방 삭제
          console.log(
            `Chat room ${roomName} has been deleted. ${this.chatRooms.entries()}`
          );
        }
        break;
      }
    }
    // console.log('check roomname',getRoomName)
    // return getRoomName
  }

  handleAgreement(roomName: string, server: Server) {
    const initialExtendedTime = 300;

    if (!this.extendedTimes.has(roomName)) {
      this.extendedTimes.set(roomName, initialExtendedTime);
    } else {
      let remainingTime =
        this.extendedTimes.get(roomName) || initialExtendedTime;

      // remainingTime= 30;
      this.extendedTimes.set(roomName, remainingTime);
    }

    const remainingTime =
      this.extendedTimes.get(roomName) || initialExtendedTime;
    console.log("이비비비비");
    setTimeout(() => {
      console.log("10초뒤 연장");
      server.in(roomName).emit("extendTime", remainingTime);
    }, 2500);
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
