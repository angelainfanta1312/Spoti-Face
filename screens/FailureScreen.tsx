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

const FailureScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>You encountered an error while loading.</Text>
    </View>
  );
};

export default FailureScreen;
