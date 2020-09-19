import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

import LandingScreen from '../screens/LandingScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Landing'
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name='Info'
          component={HomeScreen}
          options={{ title: 'Information' }}
        />
        <Stack.Screen
          name='Jump'
          component={HomeScreen}
          options={{ title: 'Get Started' }}
        />
        <Stack.Screen name='Camera' component={CameraScreen} />
        <Stack.Screen name='Playlist' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }: any) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Camera', { name: 'Jane' })}
    />
  );
};
const ProfileScreen = () => {
  return <Text>This is Jane's profile</Text>;
};

export default MyStack;
