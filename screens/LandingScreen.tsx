import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

const onboard1 = Asset.fromModule(
  require('../assets/images/onboardscreen1.png')
);
const iconnotround = Asset.fromModule(
  require('../assets/images/iconnotrounded.png')
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
} from 'react-native';
import { Constants } from 'expo-camera';

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
            <Text style={styles.titleTextFirst}>step 1: </Text>
            <Text style={styles.titleTextSecond}>take a picture</Text>

            <Image
              source={{ uri: onboard1.uri }}
              style={{ width: 400, height: 400 }}
            />

            <Text style={styles.titleTextThird}>
              our camera will let you know if your face is detectable through
              turning the button red or green
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
            <Text style={styles.titleTextFirst}>step 2: </Text>
            <Text style={styles.titleTextSecond2}>we analyze your face</Text>

            <Image
              source={{ uri: onboard1.uri }}
              style={{ width: 400, height: 400 }}
            />

            <Text style={styles.titleTextThird}>
              we use your facial landmarks like your smile with google vision
              technology to detect your emotion
            </Text>

            <View style={styles.footerWrapper}>
              <Icon name="circle-thin" size={32} color="green" />
              <Icon name="circle-thin" size={32} color="white" />
              <Icon name="circle-thin" size={32} color="greeen" />
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
            onPress={() => navigation.navigate('Camera', { name: 'Jane' })}
          >
            <Text style={styles.titleTextFirst}>step 3: </Text>
            <Text style={styles.titleTextSecond}>blah blah blah</Text>

            <Image
              source={{ uri: onboard1.uri }}
              style={{ width: 400, height: 400 }}
            />

            <Text style={styles.titleTextThird}>
              we use your facial landmarks like your smile with google vision
              technology to detect your emotion
            </Text>

            <View style={styles.footerWrapper}>
              <Icon name="circle-thin" size={32} color="green" />
              <Icon name="circle-thin" size={32} color="green" />
              <Icon name="circle-thin" size={32} color="white" />
            </View>

            <Text style={styles.titleTextFourth}>
              tap anywhere to get started!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB954',
    //alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingTop: 60,
  },
  headerContainer: {
    flex: 0.15,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  titleTextFirst: {
    fontSize: 88,
    fontWeight: 'normal',
    color: 'white',
    paddingLeft: 15,
  },
  titleTextSecond: {
    fontSize: 56,
    fontWeight: '400',
    color: 'white',
    paddingLeft: 15,
    paddingTop: 10,
  },
  titleTextSecond2: {
    fontSize: 44,
    fontWeight: '400',
    color: 'white',
    paddingLeft: 5,
    paddingTop: 10,
  },
  titleTextThird: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
    paddingLeft: 15,
  },
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 45,
    paddingHorizontal: 25,
  },
  titleTextFourth: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
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
