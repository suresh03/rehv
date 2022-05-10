/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { profilePic, pencile, communityBlankIcon } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeaderWithBackAction } from "../../Components/CustomHeader/Header";
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import Postcard from "./Components/Postcard";
import { useTheme } from "react-native-paper";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import { useAppValue } from "../../Recoil/appAtom";
import {
  useCommunityValue,
  useSetCommunityState,
} from "../../Recoil/communityAtom";
import { useFocusEffect } from "@react-navigation/native";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";
import PostCreationSuccessModal from "../CreatePost/Components/PostCreationSuccessModal";
import {
  useCreatePostState,
  useCreateValue,
  useSetCreatePostState,
} from "../../Recoil/createPostAtom";

export default function CommunityScreen({ navigation }) {
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const { likeOrComment } = useCommunityServices();
  const { user } = useAppValue();
  const { refreshCommunity } = useCommunityValue();
  const { modalVisible } = useCreateValue();

  const setModalVisible = useSetCreatePostState();
  const setRefreshCommunityState = useSetCommunityState();
  const { role } = user;
  console.log("role", role);

  //const manager = Boolean(areYouManager.replace(`"`, ""));
  const [membersList, setMembersList] = useState([]);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [communityList, setCommunityList] = useState([]);
  const [managementIds, setManagementIds] = useState([]);
  const [commIds, setCommIds] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const [selectedCommunityDetails, setSelectedCommunityDetails] = useState([]);

  const [LangType, setLangType] = useState("");

  useEffect(() => {
    getUserDetails();
  }, [LangType]);

  const getUserDetails = () => {
    ApiGetMethod(`user/getUserDetails`)
      .then((res) => {
        setLangType(res.data[0].langSymbol);
      })
      .finally(() => console.log("success"));
  };

  const profileClick = (item, role, _id) => {
    if (role.toLowerCase() == "excoach") {
      navigation.navigate("ExCoachProfileScreen", { item, _id });
    } else {
      navigation.navigate("MemberProfileScreen", { item, _id });
    }
  };

  const handleItemClick = (communityId) => {
    headerScrollRef.current.scrollTo({ x: 500, y: 0, animated: true });

    let tempArr = [...communityList];
    tempArr.forEach((el) => {
      if (communityId === el._id) {
        el.selected = true;
        setSelectedCommunityId(el._id);
      } else {
        el.selected = false;
      }
    });
    setCommunityList(tempArr);
  };

  const likeOrCommentAction = async (action, val, postId, index) => {
    let dataValue = postData;
    dataValue[index].isLikes = !dataValue[index].isLikes;
    dataValue[index].totalLikes = dataValue[index].isLikes
      ? dataValue[index].totalLikes + 1
      : dataValue[index].totalLikes - 1;
    setPostData(dataValue);
    likeOrComment(action, postId, selectedCommunityId, val)
      .catch((error) => {
        console.log("like Action Error ", error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      // .finally(() => getCommunityById());
      .finally(() => console.log());
  };

  const _deletePost = async (id) => {
    ApiPostMethod("post/deletePost", { postId: id })
      .then((resp) => {
        if (resp.statusCode === 200) {
          SnackbarHandler.successToast(Lang.MESSAGE, resp.message);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, resp.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => getCommunityById());
  };

  // get community and get post

  const getCommunityById = () => {
    // setLoading(true)
    if (selectedCommunityId !== "") {
      ApiGetMethod(
        `post/getCommunityListById?communityId=${selectedCommunityId}`
      )
        .then((res) => {
          console.log(
            `getCommunityListById resss => ${selectedCommunityId} `,
            res.data
          );
          setSelectedCommunityDetails(res.data);
          let temp = [...res.data.postList];
          temp.map((item) => {
            if (item.eventType == "POST") {
              console.log("item", item);
              item.pictureUrl = item.pictureUrlArray.reduce(
                (acc, item) => acc.concat(item.image),
                []
              );
            }
          });
          setPostData(temp);
          setMembersList(res.data.cummunityList);
        })
        .catch((error) => {
          SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
          console.log("error?.message", error?.message);
        })
        .finally(() => console.log("false"));
    }
  };

  const getSelectedCommunity = () => {
    let tempManagementIds = [];
    let tempCommIds = [];
    ApiGetMethod("user/selectedCommunityList")
      .then((res) => {
        console.log("selectedCommunityList res => ", res);
        let temp = res?.data?.list.reduce((acc, item, currIndex) => {
          let { __v, updatedAt, createdAt, isDeleted, ...rest } =
            item.data[0].communityData;
          if (rest.type == "Manager") {
            tempManagementIds.push(rest._id);
          } else {
            tempCommIds.push(rest._id);
          }
          return acc.concat({ ...rest, selected: currIndex == 0 });
        }, []);
        setManagementIds(tempManagementIds);
        setCommIds(tempCommIds);
        setCommunityList(temp);
        if (temp?.length > 0) {
          setSelectedCommunityId(temp[0]._id);
        }
        setRefreshCommunityState({ refreshCommunity: false });
      })
      .catch((error) => {
        console.log("selectedCommunityList error", error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => console.log("false"));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getSelectedCommunity();
  }, [refreshCommunity]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
      getCommunityById();
      // getMyPost();
    });
    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCommunityById();
    }, [selectedCommunityId])
  );

  const hideModal = () => {
    setModalVisible({ modalVisible: false });
  };

  const headerScrollRef = useRef();

  const listHeaderRender = () => {
    return (
      <>
        <ScrollView
          ref={headerScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {communityList?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleItemClick(item._id, index);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor:
                    item.selected == false ? "lightgrey" : theme.colors.primary,
                  marginHorizontal: Scaler(10),
                  marginTop: Scaler(20),
                  borderWidth: Scaler(1.2),
                  borderRadius: Scaler(10),
                  paddingRight: Scaler(10),
                  height: Scaler(54),
                }}
              >
                <View
                  style={{
                    height: Scaler(52),
                    width: Scaler(52),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.picture }}
                    style={{
                      height: Scaler(45),
                      width: Scaler(45),
                      resizeMode: "contain",
                    }}
                    resizeMode={"contain"}
                  />
                </View>
                <Text
                  style={{
                    fontSize: Scaler(16),
                    ...theme.fonts.medium,
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.colors.disabledText,
                  }}
                >
                  {LangType === "en" ? item.name : item.frenchName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: Scaler(20),
            marginVertical: Scaler(20),
          }}
        >
          <Text
            style={{
              fontSize: Scaler(16),
              ...theme.fonts.semiBold,
              alignItems: "center",
              justifyContent: "center",
              color: theme.colors.disabledText,
            }}
          >
            {(membersList[0]?.userData.length ?? "") + " " + Lang.MEMBERS}
          </Text>

          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 5,
              backgroundColor: "#EEEBFF",
            }}
            onPress={() =>
              navigation.navigate("CommunityMemberScreen", {
                members: membersList[0]?.userData ?? [],
                totalMembers: membersList[0]?.userData.length,
                communityId: selectedCommunityId,
              })
            }
          >
            <Text
              style={{
                fontSize: Scaler(12),
                color: theme.colors.primary,
                textAlign: "center",
                ...theme.fonts.medium,
              }}
            >
              {Lang.VIEW_ALL}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: Scaler(54) }}
        >
          {membersList[0]?.userData?.map((item, Index) => {
            return (
              <View
                key={Index}
                style={{
                  marginHorizontal: Scaler(10),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                  }}
                >
                  {item?.profilePic?.trim() == "" ||
                  item?.profilePic?.includes("https://") == false ||
                  item?.profilePic == undefined ||
                  item?.profilePic == null ? (
                    <Image
                      style={{
                        width: Scaler(52),
                        height: Scaler(52),
                        resizeMode: "contain",
                      }}
                      source={profilePic}
                      resizeMode={"contain"}
                    />
                  ) : (
                    <Image
                      style={{
                        height: Scaler(52),
                        width: Scaler(52),
                        resizeMode: "cover",
                        borderRadius: Scaler(40),
                      }}
                      source={{ uri: item?.profilePic }}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </>
    );
  };

  const EmptyListMessage = () => {
    return (
      <>
        <View style={{ justifyContent: "center", height: hp(65) }}>
          <View
            style={{
              backgroundColor: "#fff",
              alignSelf: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              shadowOpacity: 0.1,
              elevation: 5,
              borderRadius: 10,
              width: "90%",
              height: hp(55),
            }}
          >
            <Image
              source={communityBlankIcon}
              resizeMode={"contain"}
              style={{
                width: wp(60),
                height: hp(40),
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                textAlign: "center",
                padding: 10,
                width: wp(90),
                alignSelf: "center",
                fontSize: 17,
                fontFamily: "Poppins-Medium",
                color: theme.colors.disabledText,
              }}
            >
              {Lang.NO_COMMUNITY_POST}
            </Text>
          </View>
        </View>
      </>
    );
  };

  const theme = useTheme();

  return (
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.colors.primary }}
      />
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <HeaderWithBackAction
          onPress={() =>
            navigation.navigate(
              role === "MANAGER"
                ? "EditManagementCommunities"
                : "EditCommunitiesScreen",
              { managementIds: managementIds, commIds: commIds }
            )
          }
          tittle_nav={true}
          tittle={Lang.COMMMUNITY}
          leftNav={true}
          leftImage={pencile}
        />
        <StatusBar barStyle="light-content" />

        <Postcard
          data={postData}
          profileClick={(item, role, id) => profileClick(item, role, id)}
          onLike={(action, val, postId, index) =>
            likeOrCommentAction(action, val, postId, index)
          }
          selectedCommunityId={selectedCommunityId}
          listHeader={() => listHeaderRender()}
          onDeletePost={(id) => _deletePost(id)}
          EmptyListMessage={() => EmptyListMessage()}
          refReshData={() => getCommunityById()}
        />

        <PostCreationSuccessModal
          visible={modalVisible}
          hideModal={hideModal}
        />
      </SafeAreaView>
    </>
  );
}
