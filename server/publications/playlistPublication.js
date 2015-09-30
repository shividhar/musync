if(Meteor.isServer){
	Meteor.publish("playlist", function(playlistId) {
 		return Playlists.find({"_id": playlistId})
	});
}