import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import Icon from "react-native-vector-icons/Ionicons";
import createPlaylist from "../Playlist";
//import createPlaylist from '../Playlist'

var photo: any = null;

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [faceOnscreen, setFaceOnscreen] = useState(false);

  //TODO move this to earlier screen
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
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
      console.log("camera not set.");
    }
  };

  let deny = () => {
    this.camera.resumePreview();
    setPressed(false);
    photo = null;
  };

  let confirm = async () => {
    if (photo == null) {
      console.error("Photo not taken or set!");
      return;
    }

    let faceData = FaceDetector.detectFacesAsync(photo.uri, {
      mode: FaceDetector.Constants.Mode.accurate,
      runClassifications: FaceDetector.Constants.Classifications.all,
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
    });

    faceData
      .then(({ faces, image }) => {
        setFaces(faces);
        //createPlaylist(faces[0], photo.base64).then( // stop loading on lastscreen).then(stop loading)
      })
      .catch((error) => console.log("Failed to detect. error: \n" + error));

    //Move to last screen (send it promise)
    //FOR NOW,
    setPressed(true);
  };

  let onFaceDetected = (faces) => {
    if (faces.faces.length > 0) setFaceOnscreen(true);
    else setFaceOnscreen(false);
  };

  if (pressed) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Camera
            style={{ flex: 1, marginBottom: 0, marginTop: 0 }}
            type="front"
            ref={(ref) => {
              this.camera = ref;
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            paddingBottom: 10,
          }}
        >
          <Icon name="ios-close" size={50} onPress={() => deny()}></Icon>
          <Icon name="ios-checkmark" size={50} onPress={() => confirm()}></Icon>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Camera
            style={{ flex: 1, marginBottom: 0, marginTop: 0 }}
            type="front"
            onFacesDetected={onFaceDetected}
            ref={(ref) => {
              this.camera = ref;
            }}
          />
        </View>
        {/* <Text style={{ fontSize: 18, marginHorizontal: 20, marginBottom: 0 }}>
          Smile:{' '}
          {faces.length > 0
            ? (faces[0].smilingProbability * 100).toFixed(2)
            : "      "}
          % Left:{" "}
          {faces.length > 0
            ? (faces[0].leftEyeOpenProbability * 100).toFixed(2)
            : "      "}
          % Right:{" "}
          {faces.length > 0
            ? (faces[0].rightEyeOpenProbability * 100).toFixed(2)
            : "      "}
          %
        </Text> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={takePic}
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              backgroundColor: faceOnscreen ? "green" : "red",
              borderRadius: 30,
            }}
          >
            {/* <Icon name={'chevron-right'} size={30} color='#01a699' /> */}
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={takePic}
          style={{
            flex: 0.15,
            alignItems: "center",
            justifyContent: "center",
            margin: 30,
            width: '80%',
            
          }}
        >
          <Text style={{ fontSize: 25 }}>Snap</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
};

export default CameraScreen;
