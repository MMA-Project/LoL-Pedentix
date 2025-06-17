import { useSearchParams } from "react-router";
import { io } from "socket.io-client";
import { useDailyPedantix } from "../context/DailyPedantixContext";

export const socket = io(import.meta.env.VITE_API_BASE_URL, {
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
      setRoomId(roomId);
      console.log("Joined room:", roomId);
    });
  };

  return {
    createRoom,
    joinRoom,
  };
}
