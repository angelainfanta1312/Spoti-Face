const axios = require('axios');

// export default function createPlaylist(base64:string, face:any){
function createPlaylist(){
  return new Promise(async (resolve, reject) => {

//figure out TARGETPARAMS
// []



// []
// (outputs {target_energy, target_danceability...})


		//handle auth...
		function getUserPass(){
				let auth_token = "BQD4siyAMYU8Bd6Emoxj3wT05Z6N1Ac-q277xDUPaBbMdT81Hk5iPhSqkZ7OeD-l8-Nw1C2XEmtouq2xr3v71HbcPBAy3C-fPBqjhAx1BQYXH-KzvMiTNvboC0CmjdKNp8lfQ0NSEoL24YNB-x1TbiKSbz8_avzJEFkLjz-eABJwy-stTjrKeIG8ZH5oyGkkpKL91OEIJy2wVAsRl7fviDb3RWvsuhU56WOqc1Gsq9SwpyGgy41Xs6EXwpPyR9SP5uwJzSXKZ4Ma4obT"
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

		// #Gets the uri of the top tracks
		await axios.get('https://api.spotify.com/v1/me/top/tracks', {
				headers: {
						'Authorization' : 'Bearer ' + auth_token,
				},
				params: {
					'limit': 30,
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
				reject("Couldn't get the top tracks")
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
						if(features["valence"] < .4){
								emotionTopTracks.push(topTracks[i])
						}
						// console.log(res.data)
				})
				.catch((error) => {
						console.error(error)
						reject("Couldn't get the audio features")
				})
			}
		//Gets the 5 tracks we are seeding with
		let seed_track = emotionTopTracks[0].split(":")[2]
		console.log(seed_track)
		for(var i =1; i<5;i++){
			let split = emotionTopTracks[i].split(":")
			let id = split[2]
			seed_track = seed_track.concat(",", id)
			console.log(id)
		}

		console.log(seed_track)
		
		//Creates a playlist to test seeding
		await axios.post('https://api.spotify.com/v1/users/' + user_name + '/playlists', {"name": "Seeded Sadder Songs", "public": false}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
			.then((res) => {
				console.log(res.data)
				playlist_id = res.data["id"]
				console.log(playlist_id)
			})
			.catch((error) => {
				console.error(error)
				reject("Can't create a new playlist")
		})

		let size = 30
		let newTracks = []
		let newness = .3 //:[0, 1] indicate fraction of tracks to come from getseed (also recentness?)
		await axios.get('https://api.spotify.com/v1/recommendations', {
		headers: {
			'Authorization' : 'Bearer ' + auth_token,
		},
		params: {
			"limit" : size*newness,
			"seed_tracks" : seed_track,
			"seed_artists" : "",
			"seed_genres" : "",
			"target_valence" : .3,
			"target_energy" : .3,
		},
		})
		.then((res) => {
			console.log(res.data)
			tracks = res.data["tracks"]
			for(let i=0; i<tracks.length; i++){
				newTracks.push(tracks[i]["uri"])
				console.log(tracks[i]["uri"])
			}
		})
		.catch((error) => {
			console.error(error)
		})

		await axios.post('https://api.spotify.com/v1/playlists/' + playlist_id + "/tracks", {"uris": newTracks}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
		.then((res) => {
			// console.log(res.data)
			console.log("Added data")
		})
		.catch((error) => {
			// console.error(error)
			console.log("couldn't add song")
			console.log(newTracks[i])
			reject("Couldn't add the song to the playlist")
		})

		// for(let i = 0; i < newTracks.length; i++){
		// 	await axios.post('https://api.spotify.com/v1/playlists/' + playlist_id + "/tracks", {"uris":[newTracks[i]]}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
		// 	.then((res) => {
		// 		// console.log(res.data)
		// 		console.log("Added data")
		// 	})
		// 	.catch((error) => {
		// 		// console.error(error)
		// 		console.log("couldn't add song")
		// 		console.log(newTracks[i])
		// 		reject("Couldn't add the song to the playlist")
		// 	})
		// }



		// newTracks = spotifyGetBasedonseed(limit size * newness: seed : (5tracks/genre), targetParams)
		// oldTracks = emtionTopTracks[:(size * (1 - newness))]


		//Creates a playlist to store the songs we recommend
		await axios.post('https://api.spotify.com/v1/users/' + user_name + '/playlists', {"name": playlist_name, "public": false}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
			.then((res) => {
				console.log(res.data)
				playlist_id = res.data["id"]
				console.log(playlist_id)
			})
			.catch((error) => {
				console.error(error)
				reject("Can't create a new playlist")
		})


		// addTracks(tracks)
		//Should add all tracks
		await axios.post('https://api.spotify.com/v1/playlists/' + playlist_id + "/tracks", {"uris":emotionTopTracks}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
			.then((res) => {
				console.log(res.data)
				console.log("Added data")
			})
			.catch((error) => {
				console.error(error)
				reject("Couldn't add the song to the playlist")
		})
    
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


createPlaylist()