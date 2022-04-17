/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { FlatList, StatusBar, SafeAreaView } from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import useApiServices from "../../Services/useApiServices";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Loader from "../../Utils/Loader";
import Lang from "../../Language";
import UserCard from "../../Components/CustomComponents/UserCard";
import EmptyCardView from "../../Components/CustomComponents/EmptyCardView";

export default function FollowerScreen({ navigation }) {
  const { ApiGetMethod } = useApiServices();
  const [loading, setLoading] = useState(true);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    getFollowersList();
  }, []);

  const getFollowersList = () => {
    ApiGetMethod(`user/followerList?pageNo=1`)
      .then((res) => {
        let temp = res.data.followerList.reduce((acc, crr) => {
          let { userData, isFollower, isFollowing, requestPending } = crr;
          return acc.concat([
            { ...userData, isFollower, isFollowing, requestPending },
          ]);
        }, []);
        console.log("getFollowers list res => ", temp);
        setFollowingList(temp);
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={CommonStyle["container"]}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={"Followers"}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      {loading ? (
        <Loader />
      ) : followingList?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={followingList}
          extraData={followingList}
          renderItem={({ item, index }) => (
            <UserCard data={item} index={index} />
          )}
        />
      ) : loading ? (
        <Loader />
      ) : (
        <EmptyCardView message={Lang.NO_FOLLOWERS_DESC} />
      )}
    </SafeAreaView>
  );
}
