import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigator from "./components/navigation/BottomNavigator";
import DetailsScreen from "./screens/DetailsScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen key={"DETAILS"} name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
