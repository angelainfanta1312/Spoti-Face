import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import Icon from "react-native-vector-icons/Ionicons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { render } from "react-dom";
import createPlaylist from "../Playlist";
import * as ImageManipulator from "expo-image-manipulator";

var photo: any = null;

const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [faceOnscreen, setFaceOnscreen] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (this.camera) {
        setPressed(false);
        this.camera.resumePreview()
      }
      //this.camera.resumePreview()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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
    if (this.camera && faceOnscreen) {
      photo = await this.camera.takePictureAsync({
        base64: true,
        quality: 0.03,
      });

      this.camera.pausePreview();
      setPressed(true);
    } else {
      console.log("camera not set or no face onscreen");
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
    
    FaceDetector.detectFacesAsync(photo.uri, {
      mode: FaceDetector.Constants.Mode.accurate,
      runClassifications: FaceDetector.Constants.Classifications.all,
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
    })
      .then(async ({ faces, image }) => {
        console.log("Faces detected: " + faces);
        photo = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 150 } }],
          {
            compress: 0.2,
            format: ImageManipulator.SaveFormat.PNG,
            base64: true,
          }
        );
        navigation.navigate("Loading");
        createPlaylist(photo.base64, faces[0], route.params.token)
          .then((playlink: any) => {
            navigation.navigate("Playlist", { link: playlink });
          })
          .catch((error: any) => {
            console.log(
              "Playlist was not (finished) creating. Error: \n" + error
            );
            navigation.navigate("Failure");
          });
      })
      .catch((error) => console.log("Failed to detect. error: \n" + error));
  };

  let onFaceDetected = (faces) => {
    if (faces.faces.length > 0) setFaceOnscreen(true);
    else setFaceOnscreen(false);
  };

  const render = () => {
    if (pressed) {
      return renderPressed();
    } else {
      return renderUnpressed();
    }
  };

  const renderPressed = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#000",
        }}
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
            paddingBottom: 20,
            backgroundColor: "#000",
          }}
        >
          <Icon
            name="ios-close"
            size={65}
            onPress={() => deny()}
            style={{ color: "red" }}
          ></Icon>
          <Icon
            name="ios-checkmark"
            size={65}
            onPress={() => confirm()}
            style={{ color: "green" }}
          ></Icon>
        </View>
      </View>
    );
  };
  const renderUnpressed = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#000",
        }}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            alignContent: "center",
            paddingBottom: 20,
            backgroundColor: "#000",
          }}
        >
          <TouchableOpacity
            onPress={takePic}
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              margin: 30,
              backgroundColor: faceOnscreen ? 'green' : 'red',
              borderRadius: 50,
            }}
          >
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return render();
};

export default CameraScreen;
