Template.musyncPlaylistItem.helper({
    playlistName: function()
    {
        //return Session.get('playlists');
        //return 
        return 'test1';
    }
});
Template.musyncPlaylistItem.events({
    'click #songlistMoveUp': function(e)
    {
        if(e.target.pos !== 0)
        {
            Meteor.call("moveSongInPlaylist", { videoId: e.target.vid, playlistId: e.target.pid, songPosition: e.target.pos - 1 } );
        }
    }
    
    , 'click #songlistMoveDown': function(e)
    {
        Meteor.call("moveSongInPlaylist", { videoId: e.target.vid, playlistId: e.target.pid, songPosition: e.target.pos + 1 } );
    }
    
    , 'click #songlistRemove': function(e)
    {
        Meteor.call("removeSongFromPlaylist", { videoId: e.target.vid, playlistId: e.target.pid });
    }
});