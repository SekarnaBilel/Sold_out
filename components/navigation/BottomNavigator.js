import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import InscriptionScreen from "../../screens/InscriptionScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Header } from "react-native/Libraries/NewAppScreen";

const Tabs = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{ showLabel: false }}
      screenOptions={({ route }) => ({
        tabLabel: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 20 },
        tabBarStyle: { backgroundColor: "white", height: "8%" },
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
  );
};

export default BottomNavigator;
