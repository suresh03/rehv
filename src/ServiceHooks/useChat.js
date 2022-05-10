import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import moment from "moment";
import UltimateConfig from "react-native-ultimate-config";
import { useAppValue } from "../Recoil/appAtom";
import { useSetSocketState, useSocketValue } from "../Recoil/socketAtom";
import { SocketContext } from "../Utils/SocketProvider";

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
  // const socketRef = useRef();
  const { token, user } = useAppValue();
  const setSocketState = useSetSocketState();
  const { socketRef, updateSocket } = useContext(SocketContext);
  const { refreshChatting, refreshChatList } = useSocketValue();

  useEffect(() => {
    if (!refreshChatting) {
      setSocketState((state) => ({
        ...state,
        refreshChatting: true,
      }));
      // getChatList();
      refreshChat();
    }
    console.log("socket status => ", socketRef.id);
  }, [socketRef.id]);

  const getChatListFromServer = () =>
    socketRef?.on(EVENTS.ChatListFromServer, (data) => {
      console.log("getChatList => ", data);
      setSocketState((state) => ({
        ...state,
        refreshChatList: true,
      }));
      if (data.chatList.length === 0) {
        setSocketState((state) => ({
          ...state,
          chatList: [],
          socketLoading: false,
          refreshChatList:false,
        }));
        return [];
      }
      let temp = data.chatList?.reduce((acc, item) => {
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

  const getChatList = () => {
    try {
      setSocketState((state) => ({ ...state, socketLoading: true }));
      if (socketRef) {
        socketRef?.emit(EVENTS.CHATLIST, {
          senderId: user?._id,
        });
        getChatListFromServer();
      }
    } catch (error) {
      console.log(error);
      setSocketState((state) => ({ ...state, socketLoading: false }));
    }
  };

  const refreshChat = () => {
    socketRef?.on(EVENTS.RECEIVE_MESSAGE, (data) => {
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

        setSocketState((state) => ({
          ...state,
          newMessage: obj,
          chatList: temp,
        }));

        // setNewMessage(obj);
      }
    });
  };

  const disconnectSocket = () => {
    socketRef?.disconnect();
    setSocketState((state) => ({
      ...state,
      connected: socketRef?.connected,
    }));
    console.log("socket status => ", socketRef);
  };

  const sendMessage = (receiverId, message) => {
    console.log("sendMessage =>>> ", user._id, receiverId);
    let payload = {
      senderId: user._id,
      receiverId: receiverId,
      companyId: user.companyId,
      message: message,
    };
    socketRef?.emit(EVENTS.SEND_MESSAGE, payload);
  };

  const readCount = (connectionId, messageId) => {
    console.log("connectionId, messageId", connectionId, user?._id, messageId);
    socketRef?.emit(EVENTS.READ_MESSAGE, {
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
    socketRef?.emit("deleteChat", {
      userId: userId,
      chatId: chatId,
    });
    console.log("deleteChat => ", chatId, userId);
  };

  return {
    disconnectSocket,
    sendMessage,
    deleteChats,
    selectToDelete,
    readCount,
    getChatList,
  };
};

export default useChat;
