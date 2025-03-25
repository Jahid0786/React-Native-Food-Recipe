import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../Categories";
import categoryServices from "../../services/categoryService";
import Recipe from "../Recipe";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);

  const [recipe, setRecipe] = useState([]);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipe([]);
  };

  const getCategories = async () => {
    try {
      const data = await categoryServices.categoryData();
      if (data) {
        setCategories(data.categories);
      } else {
        console.log("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const data = await categoryServices.categoryDataByFilter(category);
      // console.log("Categories Recipe:", data);

      if (data) {
        setRecipe(data.meals);
      } else {
        console.log("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    getCategories();
    // getCategoriesData(categories);
    getRecipes();
  }, []);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/reactnative.png")}
            className="rounded-full"
            style={{ width: hp(5), height: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greeting puch line */}
        <View className="mx-4 mt-2 mb-2">
          <Text
            style={{ fontSize: hp(1.7) }}
            className="text-neutral-600 font-medium"
          >
            Hello , Jahid
          </Text>

          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>

          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-red-500">home</Text>
          </Text>
        </View>

        {/* search input  */}

        <View className="mx-4 flex-row items-center rounded-full bg-gray-100 p-[2px]">
          <TextInput
            placeholder="search any recipe.."
            style={{ fontSize: hp(1.7) }}
            placeholderTextColor={"gray"}
            className="flex-1 pl-3  text-base mb-1 tracking-wider"
          />

          <View className="bg-white rounded-full p-2 mx-2">
            <MagnifyingGlassIcon size={hp(3)} color="gray" />
          </View>
        </View>

        <View className="flex-1">
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipe */}

        <View>
          <Recipe meals={recipe} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
