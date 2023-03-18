import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Linking from "expo-linking";
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
  Share,
} from "react-native";

const PlaylistScreen = ({ navigation, route }) => {
  // function Playlist(){
  // 	Linking.openURL(playlist_id)
  // }
  let [fontsLoaded] = Font.useFonts({
    "Avenir-Light": require("../assets/fonts/Avenir-Light.ttf"),
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out this playlist made based off of my face! " +
          route.params.link[1],
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: iconround.uri }}
          style={{
            width: 100,
            height: 100,
            alignItems: "center",
            paddingBottom: 25,
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <View style={{ paddingTop: 25, paddingBottom: 25 }}>
          <Image
            source={{ uri: spottext.uri }}
            style={{
              width: 225,
              height: 60,
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </View>

        <Text style={styles.titleTextFirst}>your playlist</Text>

        <Text style={styles.titleTextFirst}>has been</Text>

        <Text style={styles.titleTextFirst}>created!</Text>

        <View style={styles.buttonsStyle}>
          <View style={styles.buttonsStyle}>
            <TouchableHighlight
              style={styles.submit}
              underlayColor="#1DB954"
              onPress={() => Linking.openURL(route.params.link[0])}
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

          <View style={styles.buttonsStyle}>
            <TouchableHighlight
              style={styles.submit}
              underlayColor="#1DB954"
              onPress={onShare}
            >
              <Text style={styles.submitText}>share with your friends</Text>
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
    backgroundColor: "#073763",
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
    fontSize: 40,
    fontWeight: "normal",
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  titleTextSecond: {
    fontSize: 40,
    fontWeight: "400",
    color: "white",
    paddingLeft: 15,
    paddingTop: 10,
    fontFamily: "Avenir-Light",
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
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1DB970",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Avenir-Light",
  },
  buttonsStyle: {
    paddingTop: 10,
  },
});

export default PlaylistScreen;
