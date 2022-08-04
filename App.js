import { StyleSheet, Text, View } from "react-native";
import { Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import InscriptionScreen from "./screens/InscriptionScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function App() {
  const Tabs = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabLabel: false,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { paddingBottom: 5, fontSize: 15 },
          tabBarStyle: { backgroundColor: "white", height: "10%" },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? "search" : "search-outline";
            } else if (rn === "Compte") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Compte" component={InscriptionScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

