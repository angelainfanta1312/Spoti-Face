const axios = require('axios');

    

export default function createPlaylist(base64:string, face:any){
  return new Promise(async (resolve, reject) => {

//figure out TARGETPARAMS
// []



// []
// (outputs {target_energy, target_danceability...})


    //handle auth...
    function getUserPass(){
        let auth_token = "BQB4f_ZVeo-GGupX4GNVd8aVYCqYOTBSNzFNHty7p84thbExJD1nbsQDCIi5NoRIhZoACeSPtUnWBaOkg6zoMr0IogLb87qcIF6nrli-ZPUd6ceyfZaHGG0k871zFhODy_zI82WKu4OWGuf-x2U9T3urFelSwmNZvWIU2bnrut88DASTLk1tegalnRZfvwrrZQZtV9EsX60ROora5xl1_6zdg9Qf6gT8qjU0r-bdl_I7lp4Np_RGiJWwehjCel8lHcmCV1vz3qfz7s1c"
        let user_name = "noteaholic"
        return [auth_token, user_name]
    } 
    // <-- return baharuser baharpass  (eventually, will have from OAuth2) (Or locally?)
    // getCredentials() <-- return credentials (eventually, go fetch from backend)

    let auth = getUserPass()
    let auth_token = auth[0]
    let user_name = auth[1]
    let playlist_name = "Test Playlist"
    let playlist_id = 0
    let topTracks = []
    let params = {"valence" : 1.0}

//Figure out SEED
     //X topArtists we probably dont need, right
    // topGenres //TODO (maybe)
    // topTracks = getTopUserTracks()

    // #Gets the uri of the top tracks
    await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
            'Authorization' : 'Bearer ' + auth_token,
        }
    })
    .then((res) => {
        let data = res.data["items"];
        for(var i = 0; i < data.length; i++){
            topTracks.push(data[i]["uri"])
            console.log(data[i]["uri"])
    }
    })
    .catch((error) => {
        console.error(error)
    })

    // #To get emotionally appropriate songs
    let emotionTopTracks = []
    for(var i = 0; i < topTracks.length; i++){
        
        let split = topTracks[i].split(":")
        let track_id = split[2]
        await axios.get('https://api.spotify.com/v1/audio-features/' + track_id, {
        headers: {
            'Authorization' : 'Bearer ' + auth_token,
        }
        })
        .then((res) => {
            let features = res.data
            console.log(features["valence"])
            if(features["valence"] > .7){
                emotionTopTracks.push(topTracks[i])
            }
            // console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
        // if(this is emotionally appropriate)
        //     emotionTopTracks.push(data[i]["uri"])
        //     console.log(data[i]["uri"])
    }
    // emotionTopTracks = {topTracks.filter( for emotionally appropriate songs using targetParams )}
    //         (how to do this)
    //         for each track in toptracks:
    //             features = spotify.getAudioFeatures(track)
    //             run cross(targetParams, features)
    //             if ^ good enough:
    //                 keep
    //             else:
    //                 toss

     // use some of emotionTopTracks for seed when generating



//how to get tracks:
    let size = 20
    let newness = .3 //:[0, 1] indicate fraction of tracks to come from getseed (also recentness?)
    
    // newTracks = spotifyGetBasedonseed(limit size * newness: seed : (5tracks/genre), targetParams)
    // oldTracks = emtionTopTracks[:(size * (1 - newness))]

    // createPlaylist ()
    //Creates a playlist
    await axios.post('https://api.spotify.com/v1/users/' + user_name + '/playlists', {"name": playlist_name, "public": false}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
        .then((res) => {
            console.log(res.data)
            playlist_id = res.data["id"]
            console.log(playlist_id)
        })
        .catch((error) => {
        console.error(error)
    })


    // addTracks(tracks)
    //Should add all tracks
    for(let i =0; i < emotionTopTracks.length; i++){
        await axios.post('https://api.spotify.com/v1/playlists/' + playlist_id + "/tracks", {"uris":[emotionTopTracks[i]]}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
            .then((res) => {
                console.log(res.data)
                console.log("Added data")
            })
            .catch((error) => {
                console.error(error)
        })
        
    }
    


    // setPicture(pic)

    //Should set picture
    // axios.put('https://api.spotify.com/v1/playlists/' + playlist_id + "/images", image_data, {headers: {'Authorization' : 'Bearer ' + auth_token}})
    // .then((res) => {
    //     console.log(res.data)
    // })
    // .catch((error) => {
    //     console.error(error)
    // })
// }
  })
}


