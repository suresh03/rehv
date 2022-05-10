import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { blackback, Search } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width } = Dimensions.get("window");
import OutlinedInput from "../../Components/SharedComponents/OutlinedInput";
import Lang from "../../Language";
import Scaler from "../../Utils/Scaler";
import Spacer from "../../Components/SharedComponents/Space";
import useApiServices from "../../Services/useApiServices";
import UserRowView from "./Components/UserRowView";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Loader from "../../Utils/Loader";

export default function NewMessageScreen({ navigation }) {
  const { ApiGetMethod } = useApiServices();
  const [searchText, setSearchText] = useState();
  const [friendsList, setFriendsList] = useState([]);
  const [friendsListCopy, setFriendsListCopy] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFriendList = async () => {
    try {
      setLoading(true);
      let resp = await ApiGetMethod(`user/friendList`);
      if (resp.statusCode == 200) {
        console.log("resp getFriendList => ", resp);
        let tempArr = await resp.data.freindList.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.userId === value.userId)
        );
        setFriendsList(tempArr);
        setFriendsListCopy(tempArr);
        setLoading(false);
      } else {
        SnackbarHandler.errorToast(resp.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFriendList();
  }, []);

  const searchFriend = (e) => {
    setSearchText(e);
    let text = e.toLowerCase();
    let friendJson = [...friendsListCopy];
    let filteredJson = friendJson.filter((item) => {
      return (
        item?.name?.toLowerCase()?.match(text) ||
        item?.department?.toLowerCase()?.match(text)
      );
    });
    if (!text || text === "") {
      setFriendsList(friendsListCopy);
    } else if (!Array.isArray(filteredJson) && !filteredJson.length) {
      // set no data flag to true so as to render flat list conditionally
      setNoData(true);
    } else if (Array.isArray(filteredJson)) {
      setNoData(false);
      setFriendsList(filteredJson);
    }
  };

  return (
    <SafeAreaView style={CommonStyle["container"]}>
      <StatusBar barStyle="default" />

      <View style={{ alignSelf: "center", width: width, height: hp(14) }}>
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            width: width,
            height: Scaler(50),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ top: hp(2), left: wp(5) }}
          >
            <Image
              style={{ height: Scaler(25), width: Scaler(25) }}
              source={blackback}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "flex-start",
              left: wp(10),
              top: hp(1.8),
              fontSize: Scaler(20.5),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
            }}
          >
            {Lang.NEW_MESSAGE}
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            alignSelf: "center",
            marginVertical: Scaler(10),
          }}
        >
          <OutlinedInput
            placeholder={"Search"}
            placeholderTextColor={"grey"}
            img={Search}
            value={searchText}
            imgStyle={{ height: Scaler(30), resizeMode: "contain" }}
            onChangeText={(t) => searchFriend(t)}
          />
        </View>
      </View>
      <Spacer size={Scaler(15)} />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={friendsList}
          extraData={friendsList}
          renderItem={({ item }) => (
            <UserRowView
              data={item}
              onItemPress={() =>
                navigation.navigate("ChatScreen", { item: item })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
