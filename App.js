import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./navigation/tab.navigation";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <TabNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
