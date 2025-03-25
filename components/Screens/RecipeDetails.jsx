import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import CacheImage from "../helper/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  ChevronLeftIcon,
  ClockIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  FireIcon,
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import categoryServices from "../../services/categoryService";
import Loading from "../Loading";
import YoutubeIframe from "react-native-youtube-iframe";

export default function RecipeDetails(props) {
  let item = props.route.params;

  const [isFvrt, setIsFavrt] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  let id = props.route.params?.idMeal;

  const getRecipes = async () => {
    try {
      const data = await categoryServices.recipeById(id);

      if (data) {
        setRecipe(data.meals[0]);
        setLoading(false);
      } else {
        console.log("Failed to fetch categories.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const ingredient = (recipe) => {
    if (!recipe) return [];
    let index = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe["strIngredient" + i]) {
        index.push(i);
      }
    }
    return index;
  };

  const getYoutubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image */}

      <View className="flex-row justify-center">
        <CacheImage
          uri={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 50,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      {/* back button */}
      <View className="absolute flex w-full justify-between items-center flex-row pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-2 ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>

        <TouchableOpacity className="rounded-full p-2 mr-5 bg-white">
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            onPress={() => setIsFavrt(!isFvrt)}
            color={isFvrt ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* meals description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between  pt-8 space-y-8">
          {/* name and area section */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(2.8) }}
              className="flex-1 text-neutral-700 font-bold"
            >
              {recipe?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(1.7) }}
              className="flex-1 text-neutral-700 space-y-1 font-semibold"
            >
              {recipe?.strArea}
            </Text>
          </View>

          {/* misc */}

          <View className="flex-row justify-around mt-3">
            <View className="bg-amber-300 flex rounded-full p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center justify-center py-2 gap-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  20
                </Text>

                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="bg-amber-300 flex rounded-full p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center justify-center py-2 gap-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  03
                </Text>

                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="bg-amber-300 flex rounded-full p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center justify-center py-2 gap-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  103
                </Text>

                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  cal
                </Text>
              </View>
            </View>

            <View className="bg-amber-300 flex rounded-full p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center justify-center py-2 gap-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                ></Text>

                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>

          {/* ingradients */}

          <View className="space-y-4 mt-4">
            <Text
              className="font-bold text-neutral-700"
              style={{ fontSize: hp(2.5) }}
            >
              Ingredients
            </Text>

            <View className="mt-3 space-y-2 gap-3 flex justify-center">
              {ingredient(recipe).map((i) => {
                return (
                  <View
                    key={i}
                    className="flex-row gap-4 space-x-4 items-center"
                  >
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />

                    <View className="flex-row gap-3">
                      <Text
                        style={{ fontSize: hp(1.9) }}
                        className="font-extrabold text-black"
                      >
                        {recipe["strMeasure" + i]}
                      </Text>

                      <Text
                        style={{ fontSize: hp(1.9) }}
                        className="font-medium text-neutral-600"
                      >
                        {recipe["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View className="space-y-4 mt-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-neutral-700 flex-1 mb-3"
            >
              Instruction
            </Text>

            <Text className="text-neutral-700" style={{ fontSize: hp(1.7) }}>
              {recipe?.strInstructions}
            </Text>
          </View>

          {/* recipe vide */}

          {recipe.strYoutube && (
            <View className="mt-3">
              <Text
                style={{ fontSize: hp(2.5), fontWeight: 800 }}
                className="text-neutral-700 mb-5"
              >
                Recipe Video
              </Text>

              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(recipe.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
