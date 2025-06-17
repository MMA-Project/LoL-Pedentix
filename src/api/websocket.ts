import { useSearchParams } from "react-router";
import { io } from "socket.io-client";
import { useDailyPedantix } from "../context/DailyPedantixContext";

export const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

export function useCoopRoom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRoomId } = useDailyPedantix();

  const createRoom = (gameId: string) => {
    socket.emit("create-room", { gameId }, ({ roomId }: any) => {
      setRoomId(roomId);
      searchParams.set("room", roomId);
      setSearchParams(searchParams);
      console.log("Room created:", roomId);
    });
  };

  const joinRoom = (roomId: string, gameId: string) => {
    socket.emit("join-room", { roomId, gameId }, ({ roomId }: any) => {
      if (!roomId) {
        console.error("Failed to join room");
        searchParams.delete("room");
        setSearchParams(searchParams);
        return;
      }
      setRoomId(roomId);
      searchParams.set("room", roomId);
      setSearchParams(searchParams);
      console.log("Joined room:", roomId);
    });
  };

  return {
    createRoom,
    joinRoom,
  };
}
