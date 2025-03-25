import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home";
import WelcomeScreen from "../Screens/WelcomeScreen";
import RecipeDetails from "../Screens/RecipeDetails";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
