import React from "react";
import socketIOClient from "socket.io-client";
import UltimateConfig from "react-native-ultimate-config";
import { useAppValue } from "../Recoil/appAtom";

export const SOCKET_URL = UltimateConfig.API_URL;
export const socket = socketIOClient(SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity,
  jsonp: false,
  transports: ["polling"],
  autoConnect: true,
  // query: {
  //   accessToken: token,
  // },
});
export const SocketContext = React.createContext(null);
