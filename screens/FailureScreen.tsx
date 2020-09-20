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
      <Text>You fucking suck balls.</Text>
    </View>
  );
};

export default FailureScreen;
