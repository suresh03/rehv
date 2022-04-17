/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Scaler from "../../Utils/Scaler";
import useChat from "../../ServiceHooks/useChat";
import { useRoute } from "@react-navigation/native";
import { useAppValue } from "../../Recoil/appAtom";
import useApiServices from "../../Services/useApiServices";
import moment from "moment";
import ChatHeader from "./Components/ChatHeader";
import Loader from "../../Utils/Loader";
import Spacer from "../../Components/SharedComponents/Space";
import ChatUI from "./Components/ChatUI";
import ChatToolbar from "./Components/ChatToolbar";
import { useSocketValue } from "../../Recoil/socketAtom";

export default function ChatScreen() {
  const { sendMessage, readCount, disconnectSocket } = useChat();
  const { ApiGetMethod } = useApiServices();
  const { user } = useAppValue();
  const route = useRoute();
  const { item } = route.params;
  const [loading, setLoading] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [chatsMessages, setChatsMessages] = useState([]);
  const { newMessage } = useSocketValue();
  const getChatHistory = async () => {
    setLoading(true);
    try {
      let data = await ApiGetMethod(
        `user/getChatHistory?senderId=${user._id}&receiverId=${item.userId}&pageNo=1`
      );
      let tempData = [...data.data];
      let x = tempData.reduce((acc, curr) => {
        // console.log("ApiGetMethod=>", curr);
        let obj = {
          message: curr.message,
          time: moment(curr.createdAt).format("HH:MM a"),
          messageId: curr?._id,
          isRead: curr?.isRead,
          connectionId: curr?.connectionId,
        };
        if (curr.receiverId?._id === user._id) {
          obj.user = curr.receiverId;
          obj.status = false;
        } else {
          obj.user = curr.senderId;
          obj.status = true;
        }
        return acc.concat(obj);
      }, []);
      setChatsMessages(x);

      setLoading(false);
      try {
        readCount(
          data.data[data.data.length - 1]?.connectionId,
          data.data[data.data.length - 1]?._id
        );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatHistory();

    //return () => disconnectSocket();
  }, [item?.userId, user?._id]);

  useLayoutEffect(() => {
    console.log(newMessage);
    if (Object.keys(newMessage)?.length > 0 && chatsMessages.length > 0) {
      let temp = [...chatsMessages];
      temp.unshift(newMessage);
      setChatsMessages(temp);
    } else {
      setChatsMessages([newMessage]);
    }
    try {
      readCount(newMessage?.connectionId, newMessage?.messageId);
    } catch (error) {
      console.log(error);
    }
  }, [newMessage]);

  const sendChat = () => {
    sendMessage(item.userId, draftMessage);
    setDraftMessage("");
  };

  const chatListRef = useRef();
  return (
    <SafeAreaView style={CommonStyle["container"]}>
      <StatusBar barStyle="default" />
      <ChatHeader name={item?.name} role={item.role} />
      <KeyboardAvoidingView
        enabled
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS == "android" ? -300 : 0}
        style={{ flex: 1 }}
      >
        {/* <Text
        style={{
          fontSize: Scaler(14),
          fontFamily: "Poppins-Medium",
          textAlign: "center",
          color: "#7F8190",
          marginVertical: hp(1),
          top: hp(2),
        }}
      >
        5:13 pm
      </Text> */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Animated.FlatList
              ref={chatListRef}
              data={chatsMessages}
              extraData={chatsMessages}
              renderItem={(data) => <ChatUI {...data} secondPerson={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                width: wp(100),
                padding: Scaler(10),
              }}
              ListFooterComponent={() => {
                return <Spacer />;
              }}
              // initialScrollIndex={chatsMessages.length - 1}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise((resolve) => setTimeout(resolve, 600));
                wait.then(() => {
                  chatListRef.current?.scrollToIndex({
                    // index:info.length-1,
                    index: 0,
                    animated: true,
                  });
                });
              }}
              inverted
              onContentSizeChange={(contentHeight) => {
                // console.log(contentHeight);
                chatListRef.current.scrollToOffset({
                  // offset: contentHeight * 100,
                  offset: 0 * 100,

                  animated: true,
                });
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
        <ChatToolbar
          sendChat={sendChat}
          setDraftMessage={setDraftMessage}
          loading={loading}
          draftMessage={draftMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
