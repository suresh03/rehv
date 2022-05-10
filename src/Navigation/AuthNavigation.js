import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import socketIOClient from "socket.io-client";
import BottomTabs from "./BottomTabBar";
import NotificationScreen from "../Screens/Notification/NotificationScreen";
import InboxScreen from "../Screens/Inbox/InboxScreen";
import MemberScreen from "../Screens/MemberShow/MemberScreen";
import EditCommunitiesScreen from "../Screens/EditCommunities/EditComunities";
import CommunitiesScreen from "../Screens/Communities/CommunitiesScreen";
import NewFeedTrendingScreen from "../Screens/NewFeedTrending/NewFeedTrending";
import SettingScreen from "../Screens/Setting/SettingScreen";
import ChangePasswordScreen from "../Screens/ChangePassword/ChangePasswordScreen";
import TermsServiceScreen from "../Screens/TermsService/TersmServiceScreen";
import PostDetailScreen from "../Screens/PostVideo/PostDetailScreen";
import TakeSurveyScreen from "../Screens/TakeSurvey/TakeSurveyScreen";
import MemberProfileScreen from "../Screens/ManegerProfile/MemberProfileScreen";
import ExCoachProfileScreen from "../Screens/ExCoachProfile/ExCoachProfileScreen";
import FollowerScreen from "../Screens/Followers/FollowersScreen";
import FollowingScreen from "../Screens/Following/FollowingScreen";
import BlockedUserScreen from "../Screens/BlockedUsers/BlockedUserScreen";
import BadgesEarnedScreen from "../Screens/BadgesEarned/BadgesEarnedScreen";
import ContestScreen from "../Screens/Contests/ContenstScreen";
import ContestPictureScreen from "../Screens/Contests/ContestPictureScreen";
import NewMessageScreen from "../Screens/Inbox/NewMessageScreen";
import ChatScreen from "../Screens/Inbox/ChatScreen";
import PrivacyScreen from "../Screens/PrivacyPolicy/PrivacyPloicyScreen";
import PointsEarnedScreen from "../Screens/PointsEarned/PointsEarned";
import ReputationIndexScreen from "../Screens/ReputationIndex/ReputationScreen";
import EditProfileScreen from "../Screens/EditProfile/EditProfileScreen";
import CommunityMemberScreen from "../Screens/Community/CommunityMemberScreen";
import ContactUsScreen from "../Screens/ContactUs/ContactUsScreen";
import LoremSlider from "../Screens/Lorem/LoremScreen";
import CommentScreen from "../Screens/CommentScreen/CommentScreen";
import CommentPictureScreen from "../Screens/CommentScreen/CommentPictureSceen";
import EditManagementCommunities from "../Screens/EditCommunities/EditManagementCommunities";
import TrendingCommunityMembersList from "../Screens/TrendingCommunityMembersList";
import EditJoinCommunities from "../Screens/NewFeedTrending/EditJoinCommunities";
import FreezedUser from "../Screens/FreezedUser/FreezedUser";
import InsightCompany from "../Screens/Dashboard/insightsCompany";
import CommunityDetails from "../Screens/Dashboard/CommunityOption";
import PersonalScreen from "../Screens/Dashboard/Personal";
import Acheivement from "../Screens/Dashboard/Acheivements";
import { SocketContext, SOCKET_URL } from "../Utils/SocketProvider";
import { useAppValue } from "../Recoil/appAtom";
import { TimeTrackerProvider } from "../Utils/TimeTracker";
const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  const { token } = useAppValue();

  const getSocket = () => {
    let x = socketIOClient.connect(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
      jsonp: false,
      transports: ["polling"],
      autoConnect: true,
      query: { accessToken: token },
    });
    return x;
  };

  const updateSocket = () => {
    // getSocket();
  };

  return (
    <TimeTrackerProvider>
      <SocketContext.Provider
        value={{ socketRef: getSocket(), updateSocket: updateSocket() }}
      >
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="InboxScreen"
            component={InboxScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="MemberScreen"
            component={MemberScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="InsightCompanyScreen"
            component={InsightCompany}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="CommunityMemberScreen"
            component={CommunityMemberScreen}
            options={{ headerShown: false }}
          />

          <AuthStack.Screen
            name="EditManagementCommunities"
            component={EditManagementCommunities}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="EditCommunitiesScreen"
            component={EditCommunitiesScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="CommunitiesScreen"
            component={CommunitiesScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="CommunityDetails"
            component={CommunityDetails}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Personal"
            component={PersonalScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Acheivement"
            component={Acheivement}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="NewFeedTrendingScreen"
            component={NewFeedTrendingScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{ headerShown: false }}
          />

          <AuthStack.Screen
            name="TermsServiceScreen"
            component={TermsServiceScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ContactUsScreen"
            component={ContactUsScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="PostDetailScreen"
            component={PostDetailScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="CommentScreen"
            component={CommentScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="CommentPictureScreen"
            component={CommentPictureScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="TakeSurveyScreen"
            component={TakeSurveyScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="MemberProfileScreen"
            component={MemberProfileScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ExCoachProfileScreen"
            component={ExCoachProfileScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="FollowerScreen"
            component={FollowerScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="FollowingScreen"
            component={FollowingScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="BlockedUserScreen"
            component={BlockedUserScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="BadgesEarnedScreen"
            component={BadgesEarnedScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ContestScreen"
            component={ContestScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ContestPictureScreen"
            component={ContestPictureScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="NewMessageScreen"
            component={NewMessageScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="LoremSliderHome"
            component={LoremSlider}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="PrivacyScreen"
            component={PrivacyScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="PointsEarnedScreen"
            component={PointsEarnedScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ReputationIndexScreen"
            component={ReputationIndexScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="LoremSlider"
            component={LoremSlider}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="TrendingCommunityMembersList"
            component={TrendingCommunityMembersList}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="EditJoinCommunities"
            component={EditJoinCommunities}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="FreezedUser"
            component={FreezedUser}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      </SocketContext.Provider>
    </TimeTrackerProvider>
  );
}

export default AuthStackNavigator;
