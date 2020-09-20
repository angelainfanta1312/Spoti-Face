import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import createPlaylist from '../Playlist';

const LoadingScreen = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'green' }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
