import React from "react";
import { FlatList, StatusBar, SafeAreaView } from "react-native";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import UserCard from "../../Components/CustomComponents/UserCard";

export default function TrendingCommunityMembersList({ navigation, route }) {
  const { members, totalMembers } = route.params;
  console.log("members", members);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={`${totalMembers ?? ""} Members`}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      {members !== null || members !== undefined ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={members}
          extraData={members}
          renderItem={({ item, index }) => (
            <UserCard data={item.userData} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </SafeAreaView>
  );
}
