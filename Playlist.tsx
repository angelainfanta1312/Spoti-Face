/*
const axios = require('axios');

export default function createPlaylist(image base64, smileprob, **facedata, ...  ){
    


//figure out TARGETPARAMS
[]




[]
(outputs {target_energy, target_danceability...})


//handle auth...
function getUserPass(){
    auth_token = ""
    username = "noteaholic"
    return auth_token, username
} <-- return baharuser baharpass  (eventually, will have from OAuth2) (Or locally?)
getCredentials() <-- return credentials (eventually, go fetch from backend)


auth_token, username = getUserPass()
playlist_name = "Testing!!"
playlist_id = 0


//Figure out SEED
     //X topArtists we probably dont need, right
    topGenres //TODO (maybe)
    topTracks = getTopUserTracks()

    #Gets the uri of the top tracks
    topTracks = axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
            'Authorization' : 'Bearer ' + auth_token,
        }
    })
    .then((res) => {
        data = res.data["items"];
        tracks = []
        for(var i = 0; i < data.length; i++){
            tracks.push(data[i]["uri"])
            console.log(data[i]["uri"])
    }
    })
    .catch((error) => {
        console.error(error)
    })

    #To get emotionally appropriate songs
    emotionTopTracks = []
    for(var i = 0; i < topTracks.length; i++){
        
        split = topTracks[i].split(":")
        track_id = split[2]
        axios.get('https://api.spotify.com/v1/audio-features/' + track_id, {
        headers: {
            'Authorization' : 'Bearer ' + auth_token,
        }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
        
        emotionTopTracks.push(data[i]["uri"])
        console.log(data[i]["uri"])


    emotionTopTracks = {topTracks.filter( for emotionally appropriate songs using targetParams )}
            (how to do this)
            for each track in toptracks:
                features = spotify.getAudioFeatures(track)
                run cross(targetParams, features)
                if ^ good enough:
                    keep
                else:
                    toss

     // use some of emotionTopTracks for seed when generating



//how to get tracks:
    let size = 20
    let newness = .3 //:[0, 1] indicate fraction of tracks to come from getseed (also recentness?)
    newTracks = spotifyGetBasedonseed(limit size * newness: seed : (5tracks/genre), targetParams)
    oldTracks = emtionTopTracks[:(size * (1 - newness))]

    createPlaylist ()
    //Creates a playlist
    axios.post('https://api.spotify.com/v1/users/' + user_name + '/playlists', {"name": playlist_name}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
        .then((res) => {
            console.log(res.data)
            playlist_id = res["id"]
        })
        .catch((error) => {
        console.error(error)
    })


    addTracks(tracks)
    //Should add all tracks
    newTracks.forEach(function(track_uri) {

        axios.post('https://api.spotify.com/v1/playlists/' + playlist_id + "/tracks", {"uris":[track_uri]}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.error(error)
        })
    });


    setPicture(pic)

    //Should set picture
    axios.put('https://api.spotify.com/v1/playlists/' + playlist_id + "/images", image_data, {headers: {'Authorization' : 'Bearer ' + auth_token}})
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.error(error)
    })
}




return a promise? 
*/