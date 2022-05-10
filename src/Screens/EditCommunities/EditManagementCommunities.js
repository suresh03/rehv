/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import Padding from "../../Components/SharedComponents/Padding";
import { TextField } from "../../Components/SharedComponents/TextField";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CustomButton } from "../../Components/SharedComponents/Button";
import Body from "../../Components/SharedComponents/Body";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import { arrowbackgroundBlue, Arrow_Right_Squa } from "../../Assets/icon";
import Scaler from "../../Utils/Scaler";
import Spacer from "../../Components/SharedComponents/Space";
import { useTheme } from "react-native-paper";
import useApiServices from "../../Services/useApiServices";
import { useAppValue } from "../../Recoil/appAtom";
import ChoiceCard from "../CompanyProcess/Component/ChoiceCard";
import { Children } from "react";
import { useSetCommunityState } from "../../Recoil/communityAtom";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";

function EditManagementCommunities({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [savingData, setSavingData] = useState(false);
  const [choiceManagement, setChoiceManagement] = useState([]);
  const [managementCounter, setManagementCounter] = useState(0);
  const [selectedCommunityIds, setSelectedCommunityIds] = useState([]);
  const setRefreshCommunityState = useSetCommunityState();
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const { user } = useAppValue();
  const { areYouManager } = user;
  const { managementIds, commIds } = route.params;

  useEffect(() => {
    alert("hi")
    setSelectedCommunityIds(managementIds);
    setManagementCounter(managementIds.length >= 2 ? 2 : managementIds.length);
    console.log("EditManagementCommunities => ", managementIds, commIds);
  }, []);

  const handleManagementItemClick = (index) => {
    if (managementCounter >= 2 && choiceManagement[index].status == false) {
      alert(`You can't select more than  "two" communities`);
      return;
    }
    choiceManagement[index].status = !choiceManagement[index].status;
    let tempCount = choiceManagement.reduce((a, b) => {
      if (b.status) {
        a = a + 1;
      }
      return a;
    }, 0);
    setManagementCounter(tempCount);
  };

  useEffect(() => {
    setLoading(true);
    const getCommunityList = async () => {
      try {
        let resp = await ApiGetMethod(`post/getCommunityList?type=Manager`);
        let data = resp.data.list.map((item) => {
          item.status = managementIds.includes(item._id);
          return item;
        });
        setChoiceManagement(data);
        setLoading(false);
      } catch (error) {
        console.assert(error);
        setLoading(false);
      }
    };
    getCommunityList();
  }, []);

  const _getCommunityIds = () => {
    let idArr = [];
    let tempMmt = [...choiceManagement];
    tempMmt.forEach((item) => {
      if (item.status) {
        idArr.push(item._id);
      }
    });
    return idArr;
  };

  const _communityToLeave = () => {
    let selectedCommunity = [..._getCommunityIds()];
    let tempIds = managementIds.filter(
      (item) => !selectedCommunity.includes(item)
    );
    console.log('_communityToLeave =>', tempIds);
    return tempIds;
  };


  const leaveCommunity = async () => {
    ApiPostMethod("user/changeCommunity", {
      communityIdArray: [..._communityToLeave()],
    })
      .then((res) => {
        console.log("changeCommunity res ", res);
        if (res.statusCode === 200) {
          onNext()
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
        setRefreshCommunityState({ refreshCommunity: true });
        
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setSavingData(false));
  };


  const onNext = () => {
    setSavingData(true);
    let data = {
      communityId: [..._getCommunityIds(), ...commIds],
    };
    ApiPostMethod("user/editProfile", data)
      .then((res) => {
        console.log("editProfile res ", res);
        if (res.statusCode === 200) {
          setSelectedCommunityIds(_getCommunityIds());
          navigation.navigate("EditCommunitiesScreen", {
            managementIds: _getCommunityIds(),
            commIds: commIds,
          
          });
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => {
        setRefreshCommunityState({ refreshCommunity: true });
        setSavingData(false);
      });
  };

  const theme = useTheme();
  const renderTitle = (selectedCount, message) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TextField
          textStyle={[ChangeStyle.interesttextStyle, { width: wp(70) }]}
          status={message}
        />
        <Text style={CommonStyle.interestCountStyle}>
          {`${selectedCount}/${areYouManager ? 2 : 3}`}{" "}
        </Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }} />
      <SafeAreaView style={CommonStyle.container}>
        <HeaderBackAction
          back_nav={() => navigation.pop()}
          headerText={true}
          headerContain={Lang.EDIT_COMMUNITY}
          headerViewStyle={{ backgroundColor: "#fff" }}
        />
        <Spacer />

        <Body
          keyboardDismissMode="interactive"
          contentContainerStyle={{
            flexGrow: 1,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Spacer />
          {choiceManagement.length == 0 || loading ? null : (
            <View style={{ alignSelf: "flex-start", marginLeft: Scaler(15) }}>
              <Text style={CommonStyle.tittleStyle}>
                {Lang.MANAGEMENT_COMMUNITY}
              </Text>
            </View>
          )}
          <Padding horizontal size={Scaler(15)}>
            <View>
              {choiceManagement.length == 0 || loading
                ? null
                : renderTitle(managementCounter, `${Lang.Select2}`)}
              {loading ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                </View>
              ) : (
                <View style={{ alignSelf: "center", alignItems: "center" }}>
                  {Children.toArray(
                    choiceManagement?.map((item, index) => (
                      <ChoiceCard
                        item={item}
                        index={index}
                        handleItemClick={(i) => handleManagementItemClick(i)}
                      />
                    ))
                  )}
                </View>
              )}
            </View>
          </Padding>
          <Spacer />
          {choiceManagement.length == 0 || loading ? null : (
            <CustomButton
              loading={savingData}
              disabled={managementCounter < 2 ? true : false || savingData}
              buttonIcon={
                managementCounter < 2 || savingData
                  ? Arrow_Right_Squa
                  : arrowbackgroundBlue
              }
              status={Lang.NEXT}
              onPress={() =>leaveCommunity()}
            />
          )}
          <Spacer size={Scaler(70)} />
        </Body>
      </SafeAreaView>
    </>
  );
}

export default EditManagementCommunities;
