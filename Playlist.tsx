const axios = require("axios");

// export default function createPlaylist(base64:string, face:any){
export default function createPlaylist(image_data: string, face: any, token){
    return new Promise(async (resolve, reject) => {


        //eyes closed: new music -->newness close : .8 ()  open : .1-.2
        //f (sp, lep, rep, roll) -> target(valence, energy, tempo)
        //figure out TARGETPARAMS
        // []
            //roll angle x smileprob 
            /*if (lep ~= rep) & lep > .3{ dont do fancy stuff }
                else test
            */

        // []
        // (outputs {valence, energy(eyes open)})
        //most important: ^smile => ^valence  10
        // [85, 100] => [.4 , .9] 3
        //  roll x sp [curious, sad]


        //Playlist name
        //sizing
        ///newness
        //Playlist [newness new songs, (1-newness) songs from library/top tracks]

        //for now, 
        sp = .75
        let params = {valence: sp, energy: .5}
        console.log("Smile Prob: " + sp)
        
        let valenceWeight = .8
        let energyWeight = 1 - valenceWeight
        function match(features){
            let valenceDiff = valenceWeight * (1 - Math.abs(features.valence - params.valence))
            let energyDiff = energyWeight * (1 - Math.abs(features.energy - params.energy))

            return valenceDiff + energyDiff
        } //[0, 1] how well features matches params


		let playlist_uri = null;
		let playlist_id = null;
		let auth_token = token
		let user_name = null
		let playlist_name = "Spotiface" //TODO
		let newness = .3 //:[0, 1]
		let size = 20 // += variability * 6
        let variability = .15;

        let numSongsNew = Math.floor(newness * size);
        let numSongsOld = size - numSongsNew;


        //unfilteredold = [(1x)(1-newness) top, (4x)(1-newness) library] (for x=100)
                //map each song to list [matchVal, song]
        // sort(unfilteredold, compare=(a > b if match(a) > match(b))) 
        // filteredold = first size * newness of unfilteredold




        //BEGIN!

        let unfilteredToptracks = []
        for(let i = 0; i < 2; i++){
            await axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: {
                    'Authorization' : 'Bearer ' + auth_token,
                },
                params: {
                    'limit': 50,
                    'offset': i * 50
                }
            })
            .then((res) => {
                let data = res.data["items"];
                for(var i = 0; i < data.length; i++){
                    unfilteredToptracks.push(data[i]["uri"])
                }
            })
            .catch((error) => {
                reject("Couldn't get the top listened tracks: \n" + error)
                return
            })
         }



        let unfilteredLibtrack = []
        for(let i = 0; i < 8; i++){
            await axios.get('https://api.spotify.com/v1/me/tracks', {
                headers: {
                    'Authorization' : 'Bearer ' + auth_token,
                },
                params: {
                    'limit': 50,
                    'offset': i * 50
                }
            })
            .then((res) => {
                let data = res.data["items"];
                for(var i = 0; i < data.length; i++){
                    filteredToptracks.push(data[i]["uri"])
                }
            })
            .catch((error) => {
                reject("Couldn't get the top library tracks: \n" + error)
                return
            })
         }
        

        let unfilteredold = unfilteredLibtrack.concat(unfilteredToptracks);
        //prepend with match val, sort 
        for(var i = 0; i < unfilteredold.length; i++){
				
            let split = unfilteredold[i].split(":")
            let track_id = split[2]
            await axios.get('https://api.spotify.com/v1/audio-features/' + track_id, {
            headers: {
                    'Authorization' : 'Bearer ' + auth_token,
                }
            })
            .then((res) => {
                    unfilteredold[i] = [match(res.data), unfilteredold[i]]
            })
            .catch((error) => {
                    reject("Could not get song features: \n" + error)
            })
        }

        let cmp = (a, b) => (b[0] - a[0]); //CHECK INTO THIS IF MESSED UP
        unfilteredold.sort(cmp)
        let filteredold = unfilteredold.slice(0, numSongsOld).map(v => v[1])


        let seedTracks = "";

        //Bandagey, but what if ^ empty?
        if (filteredold.length == 0){
            if(unfilteredold.length == 0){
                reject("No songs found whatsoever.")
                return
            }
        } else {
            //console.log(seed_track)
            for(var i =0; i<5;i++){
                if(i >= filteredold.length)
                    break
                let split = filteredold[i].split(":")
                let id = split[2]
                if(i == 0){
                    seedTracks = id
                }
                else{
                    seedTracks = seedTracks.concat(",", id)
                }
            }
        }

        
        let filterednew = []
		await axios.get('https://api.spotify.com/v1/recommendations', {
		headers: {
			'Authorization' : 'Bearer ' + auth_token,
		},
		params: {
			"limit" : numSongsNew,
			"seed_tracks" : seedTracks,
			"seed_artists" : "",
			"seed_genres" : "",
            "target_valence" : params.valence,
            "target_energy" : params.energy
		},
		})
		.then((res) => {
			let tracks = res.data["tracks"]
			for(let i=0; i<tracks.length; i++){
				filterednew.push(tracks[i]["uri"])
			}
		})
		.catch((error) => {
            reject("Could not get recommended tracks: \n" + error)
            return
        })
        
        let finalPlaylist = filteredold.concat(filterednew)


        //Create the playlist
        await axios.post('https://api.spotify.com/v1/users/' + user_name + '/playlists', {"name": playlist_name, "public": false}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
            .then((res) => {
                playlist_id = res.data["id"]
                playlist_uri = res.data["uri"]
            })
            .catch((error) => {
                reject("Can't create a new playlist: \n" + error)
                return
        })

        
        //Add songs to playlist
		await axios.post('https://api.spotify.com/v1/playlists/' + playlist_id + "/tracks", {"uris": finalPlaylist}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
		.catch((error) => {
            reject("Couldn't add a song to the playlist: \n" + error)
            return
		})

		
		//Creates the playlist
		await axios.post('https://api.spotify.com/v1/users/' + user_name + '/playlists', {"name": playlist_name, "public": false}, {headers: {'Authorization' : 'Bearer ' + auth_token}})
            .then((res) => {
                playlist_id = res.data["id"]
                playlist_uri = res.data["uri"]
            })
            .catch((error) => {
                reject("Couldn't create a new playlist: \n" + error)
                return
        })
        
    
        //Set playlist image
        axios.put('https://api.spotify.com/v1/playlists/' + playlist_id + "/images", image_data, {headers: {'Authorization' : 'Bearer ' + auth_token, "Content-Type":"image/jpeg"}})
        .catch((error) => {
            reject("Couldn't set playlist image: \n" + error)
            return
        })

        resolve(playlist_uri)
        
    })
}
