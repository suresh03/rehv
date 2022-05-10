/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, SafeAreaView, Alert } from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import UserCard from "../../Components/CustomComponents/UserCard";
import Lang from "../../Language";

export default function MemberScreen({ navigation, route }) {
  const { postId, isLikes } = route?.params?.data;
  const { likeOrCommentList, loading } = useCommunityServices();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    //get like or comment list
    const getLikeOrCommentList = async () => {
      try {
        const res = await likeOrCommentList(postId, isLikes);
        // console.log(" likeOrCommentList =?>  ", res.list);

        let temp = res.list.reduce((acc, crr) => {
          let { userData, isFollower, isFollowing, requestPending } = crr;
          return acc.concat([
            { ...userData[0], isFollower, isFollowing, requestPending },
          ]);
        }, []);
        setUserList(temp);
      } catch {
        (error) => {
          console.log("error comment ", error);
          Alert.alert(Lang.MESSAGE, error);
        };
      }
    };
    getLikeOrCommentList();
  }, []);

  const renderItem = ({ item, index }) => {
    return <UserCard data={item} index={index} />;
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={"RehvUps"}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userList}
        extraData={userList}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
