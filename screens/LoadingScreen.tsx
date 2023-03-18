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
  ProgressBarAndroid
} from 'react-native';
import createPlaylist from '../Playlist';

const LoadingScreen = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: '#073763' }}
    >
      <ProgressBarAndroid styleAttr="Horizontal" style={styles.progressBar} />
      <Text style={styles.titleTextFirst}>Creating your personalized Playlist</Text>
    </View>
  );
};
const styles = StyleSheet.create({
titleTextFirst: {
  fontSize: 30,
  fontWeight: "normal",
  color: "white",
  textAlign: "center",
  fontFamily: "Avenir-Light",
},
progressBar:{
  padding: 5,
marginLeft:30,
marginRight:30
}
});
export default LoadingScreen;
