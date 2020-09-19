import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

const LandingScreen = ({ navigation }: any) => {
  const [state, setState] = React.useState(0);
  if (state === 0) {
    return <Text>This is state {state}</Text>;
  } else if (state === 1) {
    return <Text>This is state {state}</Text>;
  } else {
    return <Text>This is state {state}</Text>;
  }
};

export default LandingScreen;
