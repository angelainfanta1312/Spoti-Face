import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import * as Font from 'expo-font';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
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


          <Text style={styles.titleTextFirst}>step 1: </Text>
          <Text style={styles.titleTextSecond}>take a picture</Text>



        </View>
      </View>


    );


  } else if (state === 1) {
    return <Text>This is state {state}</Text>;


  } else {
    return <Text>This is state {state}</Text>;


  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB954',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingLeft: 30,
    paddingTop: 60
  },
  headerContainer: {
    flex: 0.15,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  titleTextFirst: {
    fontSize: 88,
    fontWeight: "normal",
    color: 'white'
  },
  titleTextSecond: {
    fontSize: 56,
    fontWeight: "normal",
    color: 'white'
  }
});

export default LandingScreen;
