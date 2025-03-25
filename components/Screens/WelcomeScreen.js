import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const logoScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 6, stiffness: 90 });
    titleOpacity.value = withTiming(1, { duration: 1500 });
    titleTranslateY.value = withTiming(0, { duration: 1500 });

    setTimeout(() => {
      runOnJS(navigation.navigate)("Home");
    }, 2500);
  }, []);

  // Animated styles with worklet
  const animatedLogoStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{ scale: logoScale.value }],
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY: titleTranslateY.value }],
    };
  });

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* Logo Animation */}
      <Animated.View
        className="rounded-full bg-white/20"
        style={[{ padding: hp(4) }, animatedLogoStyle]}
      >
        <View className="rounded-full bg-white/20" style={{ padding: hp(4) }}>
          <Image
            source={require("../../assets/images/logo.jpg")}
            className="rounded-full"
            style={{ width: hp(20), height: hp(20) }}
          />
        </View>
      </Animated.View>

      {/* Title Animation */}
      <Animated.View
        className="flex items-center mt-7"
        style={animatedTitleStyle}
      >
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-white tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Food is always right
        </Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
