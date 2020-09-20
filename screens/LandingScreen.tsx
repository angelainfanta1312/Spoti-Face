import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";
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
  Alert,
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
  const [state, setState] = React.useState(0);
  const [authtoken, setAuthtoken] = React.useState(null);

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "2d76215e913f4fcf92c226d665f58c1b",
      scopes: ["playlist-modify-private", "playlist-modify-public", "ugc-image-upload"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri(),
    },
    discovery
  );
  React.useEffect(() => {
    if (response?.type === "success") {
      const { token } = response.params;
      //console.log(JSON.stringify(response.params, null, "\n"))
      //console.log(response.authentication?.accessToken);
      setAuthtoken(response.authentication?.accessToken)
    }
  }, [response]);

  if (state === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setState(1)}>
            <Text style={styles.titleTextFirst}>Step 1: </Text>
            <Text style={styles.titleTextSecond}>take a picture</Text>

            <Image
              source={{ uri: onboard1.uri }}
              style={{ width: 425, height: 425 }}
            />

            <Text style={styles.titleTextThird}>
              If you see green, you're good to go.
            </Text>

            <View style={styles.footerWrapper}>
              <Icon name="circle-thin" size={32} color="white" />
              <Icon name="circle-thin" size={32} color="green" />
              <Icon name="circle-thin" size={32} color="green" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (state === 1) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setState(2)}>
            <Text style={styles.titleTextFirst}>Step 2: </Text>
            <Text style={styles.titleTextSecond2}>we analyze your face</Text>

            <Image
              source={{ uri: onboard2.uri }}
              style={{ width: 375, height: 375 }}
            />

            <Text style={styles.titleTextThird}>
              using your facial landmarks and google vision technology, we
              survey your likely emotions
            </Text>

            <View style={styles.footerWrapper}>
              <Icon name="circle-thin" size={32} color="green" />
              <Icon name="circle-thin" size={32} color="white" />
              <Icon name="circle-thin" size={32} color="green" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (state === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setState(3)}>
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
              <Icon name="circle-thin" size={32} color="green" />
              <Icon name="circle-thin" size={32} color="green" />
              <Icon name="circle-thin" size={32} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
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

            <TouchableHighlight
              style={styles.submit}
              underlayColor="#1DB954"
              onPress={async () => {
                await promptAsync();
                if (authtoken != null)
                  navigation.navigate('Camera', {token: authtoken});
              }}
            >
              <Text style={styles.submitText}>login to spotify</Text>
            </TouchableHighlight>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DB954",
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
    fontSize: 88,
    fontWeight: "normal",
    color: "white",
    paddingLeft: 15,
  },
  titleTextSecond: {
    fontSize: 45,
    fontWeight: "400",
    color: "white",

    paddingTop: 10,
    textAlign: "center",
  },
  titleTextSecond2: {
    fontSize: 40,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: "center",
  },
  titleTextThird: {
    fontSize: 24,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 30,
    textAlign: "center",
  },
  titleTextThirdish1: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    paddingTop: 90,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  titleTextThirdish2: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 15,
    paddingBottom: 50,
    textAlign: "center",
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
  },
  footerWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: 45,
    paddingHorizontal: 25,
  },
  titleTextFourth: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    paddingLeft: 15,
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
    paddingTop: 25,
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
