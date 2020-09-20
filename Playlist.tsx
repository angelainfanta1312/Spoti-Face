const axios = require("axios");

// export default function createPlaylist(base64:string, face:any){
<<<<<<< HEAD
export default function createPlaylist(image_data: string, sp: any, token) {
  return new Promise(async (resolve, reject) => {
    //figure out TARGETPARAMS
    // []
    sp = 0.8;

    // []
    // (outputs {target_energy, target_danceability...})

    //for now,
    let params = { valence: sp };
    console.log("Smile Prob: " + sp);
    let variability = 0.15;

    //handle auth...
    function getUserPass() {
      let auth_token =
        "BQCpvnpMVtbtnXrGUmkU2omVT2q83rGnL0B1Lsambr_FNDYr5faTasYki4lrrEphUJrM_ynas2LGPf0-C3sBLjzzSetIwpnL0_MBkwyOSndaZwws056dwPpoPwZasF23cfUK1BRPvJrm-_ISJcspxruU1bJppwFO9aTbUDOmAgKu_sHV1Y3llVCBFknevid0qbZGfwFwtgmQ25IEp6j757uAJV_yLfGK4k_vXT-kIyM1SIZqxLbMo8ytFx5yhO-EBfYrHrKSFRDV0EMx";
      let user_name = "noteaholic";
      return [auth_token, user_name];
    }
    // <-- return baharuser baharpass  (eventually, will have from OAuth2) (Or locally?)
    // getCredentials() <-- return credentials (eventually, go fetch from backend)

    let auth = getUserPass();
    let auth_token = auth[0];
    let user_name = auth[1];
    let playlist_name = "buffyiscool69";
    let newness = 0.3; //:[0, 1] indicate fraction of tracks to come from getseed (also recentness?)
    let size = 20; //not really though

    let playlist_id = null;
    let topTracks = [];

    // #Gets the uris of the top tracks
    await axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
        params: {
          limit: 50,
        },
      })
      .then((res) => {
        let data = res.data["items"];
        for (var i = 0; i < data.length; i++) {
          topTracks.push(data[i]["uri"]);
          //console.log(data[i]["uri"])
=======
export default function createPlaylist(image_data: string, face: any, token){
    return new Promise(async (resolve, reject) => {

        //figure out TARGETPARAMS
        // []
        console.log("Face passed to createPlaylist: " + JSON.stringify(face))
        return

        let sp = .99
                

        // []
        // (outputs {target_energy, target_danceability...})

        //for now, 
        let params = {valence: sp}
        console.log("Smile Prob: " + sp)
        let variability = .15;


		//handle auth...
		function getUserPass(){
				let auth_token = "BQCpvnpMVtbtnXrGUmkU2omVT2q83rGnL0B1Lsambr_FNDYr5faTasYki4lrrEphUJrM_ynas2LGPf0-C3sBLjzzSetIwpnL0_MBkwyOSndaZwws056dwPpoPwZasF23cfUK1BRPvJrm-_ISJcspxruU1bJppwFO9aTbUDOmAgKu_sHV1Y3llVCBFknevid0qbZGfwFwtgmQ25IEp6j757uAJV_yLfGK4k_vXT-kIyM1SIZqxLbMo8ytFx5yhO-EBfYrHrKSFRDV0EMx"
				let user_name = "noteaholic"
				return [auth_token, user_name]
		} 
		// <-- return baharuser baharpass  (eventually, will have from OAuth2) (Or locally?)
		// getCredentials() <-- return credentials (eventually, go fetch from backend)

		let auth = getUserPass()
		let auth_token = auth[0]
		let user_name = auth[1]
		let playlist_name = "buffyiscool69"
		let newness = .3 //:[0, 1] indicate fraction of tracks to come from getseed (also recentness?)
		let size = 20 //not really though
        

		let playlist_id = null;
		let topTracks = []


		// #Gets the uris of the top tracks
		await axios.get('https://api.spotify.com/v1/me/top/tracks', {
				headers: {
						'Authorization' : 'Bearer ' + auth_token,
				},
				params: {
					'limit': 50,
				}
		})
		.then((res) => {
				let data = res.data["items"];
				for(var i = 0; i < data.length; i++){
						topTracks.push(data[i]["uri"])
						//console.log(data[i]["uri"])
		}
		})
		.catch((error) => {
				//console.error(error)
                reject("Couldn't get the top tracks")
                return
		})

		// #To get emotionally appropriate songs from top tracks
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
                    //console.log(features["valence"])
                    let valDiff = Math.abs(features["valence"] - params.valence) //use this to sort later
                    if(valDiff < variability){
                            emotionTopTracks.push(topTracks[i])
                    }
                    // //console.log(res.data)
            })
            .catch((error) => {
                    //console.error(error)
                    reject("Couldn't get the audio features")
                    return
            })
>>>>>>> 9001d09e92ce2a3a682acf551b770376333cfec6
        }
      })
      .catch((error) => {
        //console.error(error)
        reject("Couldn't get the top tracks");
        return;
      });

    // #To get emotionally appropriate songs from top tracks
    let emotionTopTracks = [];
    for (var i = 0; i < topTracks.length; i++) {
      let split = topTracks[i].split(":");
      let track_id = split[2];
      await axios
        .get("https://api.spotify.com/v1/audio-features/" + track_id, {
          headers: {
            Authorization: "Bearer " + auth_token,
          },
        })
        .then((res) => {
          let features = res.data;
          //console.log(features["valence"])
          let valDiff = Math.abs(features["valence"] - params.valence); //use this to sort later
          if (valDiff < variability) {
            emotionTopTracks.push(topTracks[i]);
          }
          // //console.log(res.data)
        })
        .catch((error) => {
          //console.error(error)
          reject("Couldn't get the audio features");
          return;
        });
    }

    if (emotionTopTracks.length < 1) {
      if (topTracks.length < 1) {
        reject("No songs...?");
        return;
      }
      emotionTopTracks.push(topTracks[0]);
    }
    //Eventually this will want to sort on how close to target
    //Gets the 5 tracks we are seeding with
    let seed_track = emotionTopTracks[0].split(":")[2];
    //console.log(seed_track)
    for (var i = 1; i < 5; i++) {
      if (i >= emotionTopTracks.length) break;
      let split = emotionTopTracks[i].split(":");
      let id = split[2];
      seed_track = seed_track.concat(",", id);
      //console.log(id)
    }

    //console.log(seed_track)

    //Creates the playlist
    await axios
      .post(
        "https://api.spotify.com/v1/users/" + user_name + "/playlists",
        { name: playlist_name, public: false },
        { headers: { Authorization: "Bearer " + auth_token } }
      )
      .then((res) => {
        //console.log(res.data)
        playlist_id = res.data["id"];
        //console.log(playlist_id)
      })
      .catch((error) => {
        //console.error(error)
        reject("Can't create a new playlist");
        return;
      });

    //gets reccomended tracks
    let newTracks = [];
    await axios
      .get("https://api.spotify.com/v1/recommendations", {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
        params: {
          limit: newness * size,
          seed_tracks: seed_track,
          seed_artists: "",
          seed_genres: "",
          target_valence: params.valence,
        },
      })
      .then((res) => {
        //console.log(res.data)
        tracks = res.data["tracks"];
        for (let i = 0; i < tracks.length; i++) {
          newTracks.push(tracks[i]["uri"]);
          //console.log(tracks[i]["uri"])
        }
      })
      .catch((error) => {
        //console.error(error)
        reject("Could not get recommended track");
        return;
      });

    //Adds reccomended tracks
    await axios
      .post(
        "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks",
        { uris: newTracks },
        { headers: { Authorization: "Bearer " + auth_token } }
      )
      .then((res) => {
        // //console.log(res.data)
        //console.log("Added data")
      })
      .catch((error) => {
        // //console.error(error)
        //console.log("couldn't add song")
        //console.log(newTracks)
        reject("Couldn't add the song to the playlist");
        return;
      });

    // Adds initially found emotionally appropriate top tracks
    await axios
      .post(
        "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks",
        { uris: emotionTopTracks },
        { headers: { Authorization: "Bearer " + auth_token } }
      )
      .then((res) => {
        //console.log(res.data)
        //console.log("Added data")
      })
      .catch((error) => {
        //console.error(error)
        reject("Couldn't add the song to the playlist");
        return;
      });

    //Should set picture
    axios
      .put(
        "https://api.spotify.com/v1/playlists/" + playlist_id + "/images",
        image_data,
        { headers: { Authorization: "Bearer " + auth_token } }
      )
      .then((res) => {
        //console.log(res.data)
      })
      .catch((error) => {
        //console.error(error)
        reject("Could not add picure");
        return;
      });

    resolve(playlist_id);
  });
}
