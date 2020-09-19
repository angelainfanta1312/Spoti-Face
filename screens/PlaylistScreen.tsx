import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { Asset } from 'expo-asset';
import * as Linking from 'expo-linking';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
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


const PlaylistScreen = (
{ navigation,
  route
}) => {
	const discovery = {
		authorizationEndpoint: 'https://accounts.spotify.com/authorize',
		tokenEndpoint: 'https://accounts.spotify.com/api/token',
	};
	
	const [request, response, promptAsync] = useAuthRequest(
		{
			responseType: ResponseType.Token,
			clientId: '2d76215e913f4fcf92c226d665f58c1b',
			scopes: ['playlist-modify-private', 'playlist-modify-public'],
			// In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
			// this must be set to false
			usePKCE: false,
			// For usage in managed apps using the proxy
			redirectUri: makeRedirectUri(),
		},
		discovery
	);
	React.useEffect(() => {
		if (response?.type === 'success') {
			const { token } = response.params;
			console.log(response.authentication?.accessToken)
	}}, [response]);

  
  var link = null;
  const [state, setState] = React.useState(0);
  const render = () => {
    console.log(state)
    if (state === 0) {
      return renderLoading();
    } else if (state === 1) {
      return renderLoaded();
    } else {
      return renderError();
    }
  };
    createPlaylist(route.params.base64, route.params.face)
    .then((link: any) => {
      link = link;
      setState(1);
    })
    .catch((error: any) => {
      console.log('suckmyballs');
      setState(2);
    });
  const renderLoading = () => {
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

          <Text style={styles.titleTextFirst}>has been</Text>

          <Text style={styles.titleTextFirst}>created!</Text>

          <View style={styles.buttonsStyle}>
            <View style={styles.buttonsStyle}>
              <TouchableHighlight
                style={styles.submit}
                underlayColor="#1DB954"
                onPress={() =>{promptAsync()}}
              >
                <Text style={styles.submitText}>open playlist in Spotify</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonsStyle}>
              <TouchableHighlight
                style={styles.submit}
                underlayColor="#1DB954"
                onPress={() => navigation.navigate('Camera', { name: 'Jane' })}
              >
                <Text style={styles.submitText}>make another playlist</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderError = () => {
    return <Text>Penis</Text>;
  };
  const renderLoaded = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
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

          <Text style={styles.titleTextFirst}>has been</Text>

          <Text style={styles.titleTextFirst}>created!</Text>

          <View style={styles.buttonsStyle}>
            <View style={styles.buttonsStyle}>
              <TouchableHighlight
                style={styles.submit}
                underlayColor="#1DB954"
                onPress={() =>
                  Linking.openURL('spotify:playlist:25pw2FVAbqv1Bi1t4FTzmL')
                }
              >
                <Text style={styles.submitText}>open playlist in Spotify</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonsStyle}>
              <TouchableHighlight
                style={styles.submit}
                underlayColor="#1DB954"
                onPress={() => navigation.navigate('Camera', { name: 'Jane' })}
              >
                <Text style={styles.submitText}>make another playlist</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  };

  //Overall return is just this statement
  return render();
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
    marginTop: 10,
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

export default PlaylistScreen;
