import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Icon from 'react-native-vector-icons/Ionicons';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
//import createPlaylist from '../Playlist'

var photo = null;

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  const [pressed, setPressed] = useState(false);

  //TODO move this to earlier screen
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //TODO make this better
  if (hasPermission !== true) {
    return <Text>No access to camera</Text>;
  }

  let takePic = async () => {
    if (this.camera) {
      photo = await this.camera.takePictureAsync();
      this.camera.pausePreview();
      setPressed(true);
    } else {
      console.log('camera not set.');
    }
    
  };

  let deny = () => {
    setPressed(false);
    this.camera.resumePreview();
    photo = null;
  };

  let confirm = () => {

    if(photo == null){
      console.error("Photo not taken or set!")
      return
    }

    FaceDetector.detectFacesAsync(photo.uri, {
      mode: FaceDetector.Constants.Mode.accurate,
      runClassifications: FaceDetector.Constants.Classifications.all,
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
    })
    .then(({ faces, image }) => {
      setFaces(faces);
      //createPlaylist(face, photo.base64)
    })
    .catch((error) => console.log('Failed to detect. error: \n' + error));

    //Move to last screen (with promise?)
    //FOR NOW,
    setPressed(false);

  }

  if (pressed) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Camera
            style={{ flex: 1, marginBottom: 0, marginTop: 0 }}
            type='front'
            ref={(ref) => {
              this.camera = ref;
            }}
          />
        </View>
        {/* <TouchableOpacity
        onPress={takePic}
        style={{
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
        width: '80%',
        backgroundColor: '#DDD',
        }}
    >
        <Text style={{ fontSize: 25 }}>Snap</Text>
    </TouchableOpacity> */}
        <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
          <Icon name='ios-beer' size={30} onPress={() => confirm()}></Icon>
        </View>
        <View
          style={{
            position: 'absolute',
            marginBottom: 0,
            justifyContent: 'flex-end',
          }}
        >
          <Icon name='ios-beer' size={30} onPress={() => deny()}></Icon>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Camera
            style={{ flex: 1, marginBottom: 0, marginTop: 0 }}
            type='front'
            ref={(ref) => {
              this.camera = ref;
            }}
          />
        </View>
        <Text style={{ fontSize: 18, marginHorizontal: 20, marginBottom: 0 }}>
          Smile:{' '}
          {faces.length > 0
            ? (faces[0].smilingProbability * 100).toFixed(2)
            : '      '}
          % Left:{' '}
          {faces.length > 0
            ? (faces[0].leftEyeOpenProbability * 100).toFixed(2)
            : '      '}
          % Right:{' '}
          {faces.length > 0
            ? (faces[0].rightEyeOpenProbability * 100).toFixed(2)
            : '      '}
          %
        </Text>
        <TouchableOpacity
          onPress={takePic}
          style={{
            flex: 0.15,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30,
            width: '80%',
            backgroundColor: '#DDD',
          }}
        >
          <Text style={{ fontSize: 25 }}>Snap</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default CameraScreen;
