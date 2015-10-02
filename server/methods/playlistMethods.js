if(Meteor.isServer){
	Meteor.methods({
		createPlaylist: function(){
			var playlistId;	
			var insertedPlaylistId;
		    while(!Playlists.findOne({"playlistId": playlistId}) && (Playlists.find({}).count() != 2176782336)){
		        playlistId = Random.hexString(6).toUpperCase();
		        if(!Playlists.findOne({"playlistId": playlistId}) && (Playlists.find({}).count() != 2176782336)){
		            insertedPlaylistId = Playlists.insert({
        		        "createdAt": new Date(),
        		        "playlistId": playlistId,
        		        "songList": []
        		    })
		        }
		    }
		    
		    return insertedPlaylistId
		}
	})
}