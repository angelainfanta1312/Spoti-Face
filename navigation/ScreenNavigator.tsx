import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
  AccessTokenRequest,
} from "expo-auth-session";
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
import LoadingScreen from "../screens/LoadingScreen";
import FailureScreen from "../screens/FailureScreen";
import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;
console.log("api", api)
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            title: "Welcome to Spotiface",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            title: "Playlist Creation",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            title: "Loading",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Failure"
          component={FailureScreen}
          options={{
            title: "Failure",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }: any) => {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "b7892ab76c7845cfa8c555d6ac8c21d8",
      scopes: ["playlist-modify-private", "playlist-modify-public"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: 'exp://192.168.0.105:19000/',
    },
    discovery
  );
  React.useEffect(() => {
    if (response?.type === "success") {
      const { token } = response.params;
      console.log(token);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Button
        title="Go to Jane's profile"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};
const ProfileScreen = () => {
  return <Text>This is Jane's profile</Text>;
};

export default MyStack;
