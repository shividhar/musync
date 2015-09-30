if(Meteor.isServer){
	Meteor.methods({
		createPlaylist: function(){
			var playlistId = Random.hexString(6).toUpperCase();		
		    while(!Playlists.findOne({"_id": playlistId}) && (Playlists.find({}).count() != 2176782336)){
		        playlistId = Random.hexString(6).toUpperCase();
		    }
		    var insertedPlaylistId = Playlists.insert({
		        "createdAt": new Date(),
		        "playlistId": playlistId,
		        "songList": []
		    })
		    return insertedPlaylistId
		}
	})
}