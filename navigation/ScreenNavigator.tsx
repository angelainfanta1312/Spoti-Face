import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";

import LandingScreen from "../screens/LandingScreen";
import CameraScreen from "../screens/CameraScreen";
import PlaylistScreen from "../screens/PlaylistScreen";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ title: "Welcome to Spotiface", headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{ title: "Playlist Creation", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Camera", { name: "Jane" })}
      />
    </View>
  );
};
const ProfileScreen = () => {
  return <Text>This is Jane's profile</Text>;
};

export default MyStack;
