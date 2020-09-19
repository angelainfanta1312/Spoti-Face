import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Asset } from "expo-asset";
const iconround = Asset.fromModule(require("../assets/images/icon.png"));
const spottext = Asset.fromModule(
  require("../assets/images/spotifacetext.png")
);
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableHighlight,
  Image,
} from "react-native";

const PlaylistScreen = ({
  navigation,
  playlistPromise,
}: {
  navigation: any;
  playlistPromise: any;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: iconround.uri }}
          style={{ width: 150, height: 150 }}
        />

        <Image
          source={{ uri: spottext.uri }}
          style={{ width: 150, height: 150 }}
        />

        <Text style={styles.titleTextFirst}>your playlist</Text>

        <Text style={styles.titleTextFirst}>has been</Text>

        <Text style={styles.titleTextFirst}>created!</Text>

        <View style={styles.buttonsStyle}>
          <View style={styles.buttonsStyle}>
            <TouchableHighlight
              style={styles.submit}
              underlayColor="#1DB954"
              onPress={() => navigation.navigate("Camera", { name: "Jane" })}
            >
              <Text style={styles.submitText}>open playlist in Spotify</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.buttonsStyle}>
            <TouchableHighlight
              style={styles.submit}
              underlayColor="#1DB954"
              onPress={() => navigation.navigate("Camera", { name: "Jane" })}
            >
              <Text style={styles.submitText}>make another playlist</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DB954",
    //alignItems: 'center',
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingTop: 60,
  },
  headerContainer: {
    flex: 0.15,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  titleTextFirst: {
    fontSize: 64,
    fontWeight: "normal",
    color: "white",
    paddingLeft: 15,
  },
  titleTextSecond: {
    fontSize: 56,
    fontWeight: "400",
    color: "white",
    paddingLeft: 15,
    paddingTop: 10,
  },
  name: {
    color: "#5e5e5e",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  desc: {
    color: "#5e5e5e",
    alignSelf: "flex-start",
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: "#c0c0c0",
    width: 10,
    margin: 10,
  },
  icon: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 30,
    fontSize: 14,
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#1DB970",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
  },
  buttonsStyle: {
    paddingTop: 50,
  },
});

export default PlaylistScreen;
