/*
export default function createPlaylist(image base64, smileprob, **facedata, ...  ){
    


//figure out TARGETPARAMS
[]



[]
(outputs {target_energy, target_danceability...})


//handle auth...
getUserPass() <-- return baharuser baharpass  (eventually, will have from OAuth2) (Or locally?)
getCredentials() <-- return credentials (eventually, go fetch from backend)



//Figure out SEED
     //X topArtists we probably dont need, right
    topGenres //TODO (maybe)
    topTracks = getTopUserTracks()
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
    addTracks(tracks)
    setPicture(pic)


}




return a promise? 
*/