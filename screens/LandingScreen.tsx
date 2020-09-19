import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

const onboard1 = Asset.fromModule(
  require("../assets/images/onboardscreen1.png")
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

  if (state === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setState(1)}>
            <Text style={styles.titleTextFirst}>Step 1: </Text>
            <Text style={styles.titleTextSecond}>take a picture</Text>

            <Image
              source={{ uri: onboard1.uri }}
              style={{ width: 400, height: 400 }}
            />

            <Text style={styles.titleTextThird}>
              If you see green, you're good to go.
            </Text>

            <View style={styles.footerWrapper}>
              <Ionicons name="ios-beer" size={32} color="white" />
              <Ionicons name="ios-beer" size={32} color="green" />
              <Ionicons name="ios-beer" size={32} color="green" />
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
              source={{ uri: onboard1.uri }}
              style={{ width: 400, height: 400 }}
            />

            <Text style={styles.titleTextThird}>
              using your facial landmarks and google vision
              technology, we survey your likely emotions
            </Text>

            <View style={styles.footerWrapper}>
              <Ionicons name="ios-beer" size={32} color="green" />
              <Ionicons name="ios-beer" size={32} color="white" />
              <Ionicons name="ios-beer" size={32} color="green" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera")}
          >
            <Text style={styles.titleTextFirst}>Step 3: </Text>
            <Text style={styles.titleTextSecond}>create your playlist</Text>

            <Text style={styles.titleTextThird}>
              extrapolating from your current mood and your music taste, we create a brand new unique playlist
            </Text>
            <Text style={styles.subTitleTextThird}>just for you.</Text>


            <Text style={styles.titleTextThirdish1}>
              tap to get started 
            </Text>
            <Text style={styles.titleTextThirdish2}>
              (we just need access to your camera.)
            </Text>

            <View style={styles.footerWrapper}>
              <Ionicons name="ios-beer" size={32} color="green" />
              <Ionicons name="ios-beer" size={32} color="green" />
              <Ionicons name="ios-beer" size={32} color="white" />
            </View>
            
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
    textAlign: 'center'
  },
  titleTextSecond2: {
    fontSize: 40,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: 'center'
  },
  titleTextThird: {
    fontSize: 24,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 80,
    textAlign: 'center'
  },
  titleTextThirdish1: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    paddingTop: 90,
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  titleTextThirdish2: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  subTitleTextThird: {
    fontSize: 24,
    fontWeight: "400",
    fontStyle: "italic",
    color: "white",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 100,
    textAlign: 'center'
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
