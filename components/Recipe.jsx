import React from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { categoryData, mealData } from "./constant";
import { Pressable } from "react-native";
import Animated, {
  FadeInDown,
  SharedTransition,
  SharedTransitionType,
} from "react-native-reanimated";
import Loading from "./Loading";
import CacheImage from "./helper/images";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, meals }) {
  const navigation = useNavigation();

  return (
    <View className="mx-4 space-y-4">
      <Text
        style={{ fontSize: hp(2.6) }}
        className="font-semibold text-neutral-600 mb-5"
      >
        Recipes
      </Text>

      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{ width: "100%", paddingLeft: isEven ? 0 : 8 }}
        className="flex justify-center mb-4 gap-1"
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 25,
          }}
          className="bg-black/5"
        /> */}

        <CacheImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 25,
          }}
          className="bg-black/5"
        />

        <Text className="font-semibold text-neutral-600 ml-2 ">
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
