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

function EditCommunitiesScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [savingData, setSavingData] = useState(false);
  const [choiceCommunities, setChoiceCommunities] = useState([]);
  const [counter, setCounter] = useState(0);
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const { user } = useAppValue();
  const { areYouManager } = user;
  const { managementIds, commIds } = route.params;
  const setRefreshCommunityState = useSetCommunityState();

  useEffect(() => {
    setCounter(commIds.length);
  }, []);

  const handleItemClick = (index) => {
    if (
      counter === (areYouManager ? 2 : 3) &&
      choiceCommunities[index].status == false
    ) {
      alert(
        `You can't select more than ${
          areYouManager ? "two" : "three"
        } communities`
      );
      return;
    }
    choiceCommunities[index].status = !choiceCommunities[index].status;
    let tempCount = choiceCommunities.reduce((a, b) => {
      if (b.status) {
        a = a + 1;
      }
      return a;
    }, 0);
    setCounter(tempCount);
  };

  useEffect(() => {
    setLoading(true);
    const getCommunityList = async () => {
      try {
        let resp = await ApiGetMethod(`post/getCommunityList?type=Employee`);
        let data = resp.data.list.map((item) => {
          item.status = commIds.includes(item._id);
          return item;
        });
        console.log(data);
        setChoiceCommunities(data);
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
    let tempMmt = [...choiceCommunities];
    tempMmt.forEach((item) => {
      if (item.status) {
        idArr.push(item._id);
      }
    });
    return idArr;
  };

  const onSave = () => {
    setSavingData(true);
    let data = {
      communityId: [..._getCommunityIds()],
    };
    console.log("");
    ApiPostMethod("user/editProfile", data)
      .then((res) => {
        console.log("editProfile res ", res);
        if (res.statusCode === 200) {
          navigation.navigate("Community");
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
        setRefreshCommunityState({ refreshCommunity: true });
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => setSavingData(false));
  };

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

  const theme = useTheme();
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
          {choiceCommunities.length == 0 || loading ? null : (
            <View style={{ alignSelf: "flex-start", marginLeft: Scaler(15) }}>
              <Text style={CommonStyle.tittleStyle}>{Lang.COI}</Text>
            </View>
          )}
          <Padding horizontal size={Scaler(15)}>
            <View>
              {choiceCommunities.length == 0 || loading
                ? null
                : renderTitle(
                    counter,
                    `${Lang.SELECT} ${manager ? 2 : 3} ${Lang.COI_DESC}`
                  )}
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
                    choiceCommunities?.map((item, index) => (
                      <ChoiceCard
                        item={item}
                        index={index}
                        handleItemClick={(i) => handleItemClick(i)}
                      />
                    ))
                  )}
                </View>
              )}
            </View>
          </Padding>
          <Spacer />
          <Spacer />
          {/* {choiceCommunities.length == 0 || loading ? null : (
            <CustomButton
              loading={savingData}
              disabled={
                counter < (areYouManager ? 2 : 3) ? true : false || savingData
              }
              buttonIcon={
                counter < (areYouManager ? 2 : 3) || savingData
                  ? Arrow_Right_Squa
                  : arrowbackgroundBlue
              }
              status={Lang.SAVE}
              onPress={() => onSave()}
            />
          )} */}
          <Spacer size={Scaler(70)} />
        </Body>
      </SafeAreaView>
    </>
  );
}

export default EditCommunitiesScreen;
