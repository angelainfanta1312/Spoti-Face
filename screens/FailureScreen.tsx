import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { Asset } from 'expo-asset';
import * as Linking from 'expo-linking';
const iconround = Asset.fromModule(require("../assets/images/icon.png"));
const spottext = Asset.fromModule(
  require('../assets/images/spotifacetext.png')
);
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

const FailureScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ActivityIndicator size="small" />
        <Image
          source={{ uri: iconround.uri }}
          style={{
            width: 100,
            height: 100,
            alignItems: 'center',
            paddingBottom: 25,
            display: 'flex',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />

        <View style={{ paddingTop: 25, paddingBottom: 25 }}>
          <Image
            source={{ uri: spottext.uri }}
            style={{
              width: 225,
              height: 60,
              display: 'flex',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </View>

        <Text style={styles.titleTextFirst}>your playlist</Text>

        <Text style={styles.titleTextFirst}>could not be</Text>

        <Text style={styles.titleTextFirst}>created</Text>

        <Text style={styles.titleTextFirst}>:(  </Text>

        <View style={styles.buttonsStyle}>

          <View style={styles.buttonsStyle}>
            <TouchableHighlight
              style={styles.submit}
              underlayColor="#1DB954"
              onPress={() => navigation.navigate('Camera')}
            >
              <Text style={styles.submitText}>try again</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB954',
    //alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingTop: 60,
  },
  headerContainer: {
    flex: 0.15,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  titleTextFirst: {
    fontSize: 64,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
  titleTextSecond: {
    fontSize: 56,
    fontWeight: '400',
    color: 'white',
    paddingLeft: 15,
    paddingTop: 10,
  },
  name: {
    color: '#5e5e5e',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#5e5e5e',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: '#c0c0c0',
    width: 10,
    margin: 10,
  },
  icon: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: 30,
    fontSize: 14,
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#1DB970',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
  buttonsStyle: {
    paddingTop: 25,
  },
});

export default FailureScreen;
