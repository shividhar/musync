if(Meteor.isServer){
	Meteor.publish("playlist", function(playlistId) {
 		return Playlists.find({"playlistId": playlistId})
	});
}