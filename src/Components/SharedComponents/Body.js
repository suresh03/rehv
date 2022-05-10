import React, { useMemo } from "react";
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Scaler from "../../Utils/Scaler";

function Body(props) {
  const { style, backgroundColor, keyboardVerticalOffset } = props;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: { flexGrow: 1, backgroundColor },
      }),
    [backgroundColor]
  );

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding":"height"}
      keyboardVerticalOffset={Scaler(10) ?? keyboardVerticalOffset}
      style={{ flexGrow: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.containerStyle, style]}
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...props}
      />
    </KeyboardAvoidingView>
  );
}

export default Body;
