import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

function Loading(props) {
  return (
    <View className="flex-1 justify-center items-center flex">
      <ActivityIndicator {...props} />
    </View>
  );
}

export default Loading;
