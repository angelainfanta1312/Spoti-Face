import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";
import  * as Linking from 'expo-linking';
import axios from "axios";
const iconround = Asset.fromModule(require("../assets/images/icon.png"));
const spottext = Asset.fromModule(
  require("../assets/images/spotifacetext.png")
);

const onboard1 = Asset.fromModule(
  require("../assets/images/onboardscreen1.png")
);

const onboard2 = Asset.fromModule(
  require("../assets/images/onboardscreen2white.png")
);

const iconnotround = Asset.fromModule(
  require("../assets/images/iconnotrounded.png")
);

import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  ToastAndroid,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Constants } from "expo-camera";

// (async () => await Font.loadAsync({
//   // Load a font `Montserrat` from a static resource
//   Montserrat: require('./assets/fonts/Montserrat.ttf'),

//   // Any string can be used as the fontFamily name. Here we use an object to provide more control
//   'Montserrat-SemiBold': {
//     uri: require('./assets/fonts/Montserrat-SemiBold.ttf')
//   },
// }))();

const LandingScreen = ({ navigation }: any) => {
  let [fontsLoaded] = Font.useFonts({
    "Avenir-Light": require("../assets/fonts/Avenir-Light.ttf"),
  });

  const [state, setState] = React.useState(4);
  //const [authtoken, setAuthtoken] = React.useState(null);

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [token, setToken] = useState("");
  const URL = Linking.makeUrl().concat('/')
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "b7892ab76c7845cfa8c555d6ac8c21d8",
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "playlist-modify-private",
        "playlist-modify-public",
        "ugc-image-upload",
        "user-top-read",
        "user-library-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: URL
      //"http://192.168.0.105:19006/",
      //showDialog: true,
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      //console.log(access_token);
      setToken(access_token);
      navigation.navigate("Camera", { token: access_token });
      ToastAndroid.showWithGravity('Spotify Login Successful!', ToastAndroid.LONG, ToastAndroid.CENTER,);
    }
    else{
      ToastAndroid.showWithGravity('Your Spotify Login Failed!', ToastAndroid.LONG, ToastAndroid.CENTER,);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      axios("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  });

  if (state === 4) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
          onPress={() => setState(0)}
           >
            <Image
              source={{ uri: iconround.uri }}
              style={{
                width: 100,
                height: 100,
                alignItems: "center",
                paddingBottom: 25,
                marginTop: 70,
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
            <Text
              style={{
                fontSize: 50,
                fontWeight: "400",
                flexWrap: "wrap",
                color: "white",
                paddingHorizontal: 15,
                fontFamily: "Avenir-Light",
                paddingTop: 40,
                textAlign: "center",
              }}
            >
              welcome to a
            </Text>
            <Text
              style={{
                fontSize: 50,
                fontWeight: "400",
                flexWrap: "wrap",
                color: "white",
                fontFamily: "Avenir-Light",
                paddingHorizontal: 15,
                textAlign: "center",
              }}
            >
              whole new
            </Text>
            <Text
              style={{
                fontSize: 50,
                fontWeight: "400",
                flexWrap: "wrap",
                color: "white",
                paddingHorizontal: 15,
                fontFamily: "Avenir-Light",
                textAlign: "center",
              }}
            >
              listening{" "}
            </Text>
            <Text
              style={{
                fontSize: 50,
                fontWeight: "400",
                flexWrap: "wrap",
                color: "white",
                fontFamily: "Avenir-Light",
                paddingHorizontal: 15,
                textAlign: "center",
              }}
            >
              experience{" "}
            </Text>

            <Text style={styles.titleTextThirdish1}>tap to get started</Text>
           </TouchableOpacity>

        </View>
      </View>
    );
  }if (state === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.titleTextFirst}>Step 1: </Text>
            <Text style={styles.titleTextSecond}>take a picture</Text>

            <Image
              source={{ uri: onboard1.uri }}
              style={{ width: 325, height: 325 }}
            />

            <Text style={styles.titleTextThird}>
              if you see green, you're good to go
            </Text>

            <View style={styles.footerWrapper}>
            <TouchableOpacity
            onPress={() => setState(0)}
            >
              <Icon name="circle-thin" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(1)}
            >
                <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity> 
            <TouchableOpacity
            onPress={() => setState(2)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(3)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            </View>

        </View>
      </View>
    );
  }if (state === 1) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>

            <Text style={styles.titleTextFirst}>Step 2: </Text>
            <Text style={styles.titleTextSecond2}>we analyze your face</Text>

            <Image
              source={{ uri: onboard2.uri }}
              style={{ width: 325, height: 325 }}
            />

            <Text style={styles.titleTextThird}>
              using your facial landmarks and google vision technology, we
              survey your likely emotions
            </Text>

            <View style={styles.footerWrapper}>
              <TouchableOpacity
            onPress={() => setState(0)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(1)}
            >
                <Icon name="circle-thin" size={32} color="white" />
            </TouchableOpacity> 
            <TouchableOpacity
            onPress={() => setState(2)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(3)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            </View>

        </View>
      </View>
    );
  }if (state === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.titleTextFirst}>Step 3: </Text>
            <Text style={styles.titleTextSecond}>create your playlist</Text>

            <Text style={styles.titleTextThird}>
              extrapolating from your current mood and your music taste, we
              create a brand new unique playlist
            </Text>
            <Text style={styles.subTitleTextThird}>just for you.</Text>

            <Text style={styles.titleTextThirdish1}>tap to get started</Text>
            <Text style={styles.titleTextThirdish2}>
              (we just need access to your camera.)
            </Text>

            <View style={styles.footerWrapper}>
            <TouchableOpacity
            onPress={() => setState(0)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(1)}
            >
                <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity> 
            <TouchableOpacity
            onPress={() => setState(2)}
            >
              <Icon name="circle-thin" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(3)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            </View>

        </View>
      </View>
    );
  }if (state === 3){
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.centerAll}>
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
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
              <Text style={styles.submitText}>to get started, just</Text>
              <TouchableHighlight
                style={styles.submit}
                underlayColor="#1DB954"
                onPress={() => {
                  promptAsync();
                }}
              >
                <Text style={styles.submitText}>login to spotify</Text>
              </TouchableHighlight>
              </TouchableOpacity>
          </View>
          <View style={styles.footerWrapper}>
            <TouchableOpacity
            onPress={() => setState(0)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(1)}
            >
                <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity> 
            <TouchableOpacity
            onPress={() => setState(2)}
            >
              <Icon name="circle-thin" size={32} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setState(3)}
            >
              <Icon name="circle-thin" size={32} color="white" />
            </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#073763",
    //alignItems: 'center',
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  headerContainer: {
    flex: 0.15,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  titleTextFirst: {
    fontSize: 58,
    fontWeight: "normal",
    color: "white",
    paddingLeft: 15,
    fontFamily: "Avenir-Light",
  },
  titleTextSecond: {
    fontSize: 45,
    fontWeight: "400",
    color: "white",

    paddingTop: 10,
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  titleTextSecond2: {
    fontSize: 40,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  titleTextThird: {
    fontSize: 24,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  titleTextThirdish1: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    paddingTop: 60,
    paddingHorizontal: 15,
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  titleTextThirdish2: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 15,
    paddingBottom: 10,
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  subTitleTextThird: {
    fontSize: 24,
    fontWeight: "400",
    fontStyle: "italic",
    color: "white",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 100,
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  footerWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: 45,
    paddingHorizontal: 45,
  },
  titleTextFourth: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    paddingLeft: 15,
    fontFamily: "Avenir-Light",
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#073763",
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
    paddingTop: 25,
  },
  centerAll: {
    paddingTop: 100,
    //marginBottom: "auto",
  },
});

export default LandingScreen;

/*
<View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleTextSecond}>welcome to</Text>
          <Text style={styles.titleTextFirst}>spotiface</Text>

          <Image
            source={{ uri: iconnotround.uri }}
            style={{ width: 400, height: 400 }}
          />
        </View>
      </View>
      */
