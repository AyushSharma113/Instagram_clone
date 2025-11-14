// import { setMessages } from "@/redux/chatSlice";
// import type { RootState } from "@/redux/store";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetRTM = () => {
//     const dispatch = useDispatch();
//   const { socket } = useSelector((store: RootState) => store.socketio);
//     const { messages } = useSelector((store: RootState) => store.chat);
//     useEffect(() => {
//         socket?.on('newMessage', (newMessage) => {
//             dispatch(setMessages([...messages, newMessage]));
//         })

//         return () => {
//             socket?.off('newMessage');
//         }
//     }, [messages, setMessages]);
// };
// export default useGetRTM;




import { addMessage } from "@/redux/chatSlice";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((store: RootState) => store.socketio);


  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (newMessage: any) => {
      dispatch(addMessage(newMessage));
      console.log('new message send')
    };
;
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);
};
export default useGetRTM;
