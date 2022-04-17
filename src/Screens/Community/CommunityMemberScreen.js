/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, SafeAreaView } from "react-native";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import UserCard from "../../Components/CustomComponents/UserCard";
import useApiServices from "../../Services/useApiServices";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";
import { useAppValue } from "../../Recoil/appAtom";

export default function CommunityMemberScreen({ navigation, route }) {
  const { members, totalMembers, communityId } = route.params;
  const { ApiGetMethod } = useApiServices();
  const [userList, setUserList] = useState([]);
  const { user } = useAppValue();

  useEffect(() => {
    //get like or comment list
    const getMembersList = async () => {
      try {
        const res = await ApiGetMethod(
          `user/viewAllMemberList?communityId=${communityId}`
        );
        console.log("viewAllMemberList =?>  ", res);
        setUserList(res.list);
      } catch {
        (error) => {
          console.log("error comment ", error);
          SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
          console.log("error?.message", error?.message);
        };
      }
    };
    getMembersList();
  }, []);

  const renderItem = ({ item, index }) => {
    return <UserCard data={item} index={index} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={`${totalMembers ?? ""} ${Lang.MEMBERS}`}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      {members !== null || members !== undefined ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={members}
          extraData={members}
          renderItem={renderItem}
        />
      ) : null}
    </SafeAreaView>
  );
}
