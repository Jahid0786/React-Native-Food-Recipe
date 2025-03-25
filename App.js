import { View, Text } from "react-native";
import AppNavigation from "./components/navigation/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableLayoutAnimations } from "react-native-reanimated";
import "./global.css";

enableLayoutAnimations(true);
export default function App() {
  return (
    <GestureHandlerRootView>
      <AppNavigation />
    </GestureHandlerRootView>
  );
}
