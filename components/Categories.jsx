import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { categoryData } from "./constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Animated, { FadeInDown } from "react-native-reanimated";
import CacheImage from "./helper/images";

const Categories = ({ activeCategory, handleChangeCategory, categories }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 15, gap: 4 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonStyle = {
            backgroundColor: isActive ? "#fbbf24" : "rgba(0,0,0,0.1)",
            padding: 6,
            borderRadius: 9999,
          };

          return (
            <TouchableOpacity
              key={index}
              style={{
                marginRight: index === categoryData.length - 1 ? 0 : 12,
              }}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center"
            >
              <View style={activeButtonStyle}>
                {/* <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6), borderRadius: hp(3) }}
                /> */}

                <CacheImage
                  uri={cat.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6), borderRadius: hp(3) }}
                />
              </View>

              <Text style={{ fontSize: hp(1.6) }}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
