import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import moment from "moment";
import UltimateConfig from "react-native-ultimate-config";
import { useAppValue } from "../Recoil/appAtom";
import { useSetSocketState } from "../Recoil/socketAtom";

const SOCKET_URL = UltimateConfig.API_URL;

const EVENTS = {
  SEND_MESSAGE: "sendMessage",
  RECEIVE_MESSAGE: "messageFromServer",
  ON_CONNECT: "socketConnected",
  ON_DISCONNECT: "disconnect",
  ON_INIT_CHAT: "initiateChat",
  READ_MESSAGE: "readMessages",
  DELETE_CHAT_THREAD: "deleteChatThread",
  ERROR: "error",
  CHATLIST: "chatList",
  ChatListFromServer: "chatListFromServer",
};

const useChat = () => {
  const socketRef = useRef();
  const { token, user } = useAppValue();
  const setSocketState = useSetSocketState();

  useEffect(() => {
    setTimeout(() => {
      if (socketRef?.current?.connected !== true) {
        connectSocket();
      } else {
        console.log("socket already connected");
      }
    }, 300);

    //return () => disconnectSocket();
  }, []);

  useEffect(() => {
    console.log("socket status => ", socketRef.current);
  }, [socketRef?.current?.connected]);

  const getChatList = () => {
    try {
      setSocketState((state) => ({ ...state, socketLoading: true }));
      if (socketRef?.current) {
        socketRef?.current?.emit(EVENTS.CHATLIST, {
          senderId: user?._id,
        });
        socketRef?.current?.on(EVENTS.ChatListFromServer, (data) => {
          console.log("getChatList => ", data);

          let temp = data.chatList.reduce((acc, item) => {
            const {
              message,
              createdAt,
              receiverData,
              sendderData,
              isRead,
              messageId,
              connectionId,
            } = item;

            let obj = {
              message: message,
              time: moment(createdAt).format("HH:MM a"),
              isRead: receiverData?._id === user._id ? isRead : true,
              messageId: messageId,
              connectionId: connectionId,
            };
            if (receiverData?._id !== user._id) {
              obj.user = receiverData;
            } else {
              obj.user = sendderData;
            }
            setSocketState((state) => ({ ...state, socketLoading: false }));
            return acc.concat(obj);
          }, []);
          console.log(temp);
          // setChatList(temp);
          setSocketState((state) => ({ ...state, chatList: temp }));
        });
      }
    } catch (error) {
      console.log(error);
      setSocketState((state) => ({ ...state, socketLoading: false }));
    }
  };

  const refreshChat = () => {
    socketRef?.current?.on(EVENTS.RECEIVE_MESSAGE, (data) => {
      console.log("data => ", data, user._id);
      if (data?.getChatData !== undefined) {
        const { getChatData, chatList } = data;
        const {
          receiverId,
          senderId,
          message,
          createdAt,
          isRead,
          messageId,
          connectionId,
        } = getChatData[0];
        let obj = {
          message: message,
          time: moment(createdAt).format("HH:MM a"),
          isRead: isRead,
          messageId: messageId,
          connectionId: connectionId,
        };
        if (receiverId?._id === user._id) {
          obj.user = receiverId;
          obj.status = false;
        } else {
          obj.user = senderId;
          obj.status = true;
        }
        let temp = data.chatList.reduce((acc, item) => {
          const {
            message,
            createdAt,
            receiverData,
            sendderData,
            isRead,
            messageId,
            connectionId,
          } = item;

          let obj = {
            message: message,
            time: moment(createdAt).format("HH:MM a"),
            isRead: receiverData?._id === user._id ? isRead : true,
            messageId: messageId,
            connectionId: connectionId,
          };
          if (receiverData?._id !== user._id) {
            obj.user = receiverData;
          } else {
            obj.user = sendderData;
          }
          setSocketState((state) => ({ ...state, socketLoading: false }));
          return acc.concat(obj);
        }, []);
        setSocketState((state) => ({ ...state, newMessage: obj ,chatList: temp}));

        // setNewMessage(obj);
      }
    });
  };

  const connectSocket = async () => {
    socketRef.current = await socketIOClient(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
      jsonp: false,
      transports: ["polling"],
      autoConnect: true,
      query: {
        accessToken: token,
      },
    });
    await socketRef.current.connect();
    setSocketState((state) => ({
      ...state,
      connected: socketRef?.current?.connected,
    }));

    getChatList();
    refreshChat();
  };

  const disconnectSocket = () => {
    socketRef.current.disconnect();
    setSocketState((state) => ({
      ...state,
      connected: socketRef?.current?.connected,
    }));
    console.log("socket status => ", socketRef.current);
  };

  const sendMessage = (receiverId, message) => {
    console.log("sendMessage =>>> ", user._id, receiverId);
    let payload = {
      senderId: user._id,
      receiverId: receiverId,
      companyId: user.companyId,
      message: message,
    };
    socketRef.current.emit(EVENTS.SEND_MESSAGE, payload);
  };

  const readCount = (connectionId, messageId) => {
    console.log("connectionId, messageId", connectionId, user?._id, messageId);
    socketRef.current.emit(EVENTS.READ_MESSAGE, {
      connectionId: connectionId,
      receiverId: user?._id,
      messageId: messageId,
    });
  };

  const selectToDelete = (i) => {
    let temp = [...recentChat];
    temp.forEach((item, index) => {
      if (i == null) {
        item.selected = false;
      } else {
        if (index == i) {
          item.selected = !item.selected;
        } else {
          item.selected = item.selected;
        }
      }
    });
    setRecentChat(temp);
    // setSocketState((state) => ({
    //   ...state,
    //   chatList: temp,
    // }));
  };

  const deleteChats = (userId, chatId) => {
    socketRef.current.emit("deleteChat", {
      userId: userId,
      chatId: chatId,
    });
    console.log("deleteChat => ", chatId, userId);
  };

  return {
    connectSocket,
    disconnectSocket,
    sendMessage,
    deleteChats,
    selectToDelete,
    readCount,
    getChatList,
  };
};

export default useChat;
