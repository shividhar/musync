Template.musyncSongListItem.helpers({
    "apiCall" : function()
    {
        if(dataApiReady)
        {
            var request = gapi.client.youtube.videos.list({part: 'snippet', id: this.videoId, maxResults: 1 });
            request.execute(
                function(response)
                {
                    if(response.items.length > 0)
                    {
                        var data = Session.get("songData" + response.items[0].id.videoId);
                        data.title = response.items[0].snippet.title;
                        data.author = response.items[0].snippet.channelTitle;
                        data.thumb = response.items[0].snippet.thumbnails.default.url;
                        Session.set("songData" + response.items[0].id.videoId, data);
                    }
                }
            );
            
        }
        Session.set("songData" + this.videoId, { title: "", author: "", thumb: "", songPosition: this.songPosition });
        return this;
        //Session.set("song" + this.songPosition, this);
        //return Session.get("song" + this.songPosition);
    }
    , "videoId" : function()
    {
        return this.videoId;
    }
    , "songPosition" : function()
    {
        return this.songPosition;
    }
    , "songOriginPlaylist" : function()
    {
        return Playlists.findOne().playlistId;
    }
    , "songName" : function()
    {
        return Session.get("songData" + this.videoId).title;
    }
    , "songThumb" : function()
    {
        return Session.get("songData" + this.videoId).thumb;
    }
    , "songAuthor" : function()
    {
        return Session.get("songData" + this.videoId).author;
    }
});

Template.musyncSongListItem.events({
    'click .songlistMoveUp': function(e)
    {
        if(e.target.pos !== 0)
        {
            Meteor.call("moveSongInPlaylist", { videoId: e.target.vid, playlistId: e.target.pid, songPosition: e.target.pos - 1 } );
        }
    }
    
    , 'click .songlistMoveDown': function(e)
    {
        Meteor.call("moveSongInPlaylist", { videoId: e.target.vid, playlistId: e.target.pid, songPosition: e.target.pos + 1 } );
    }
    
    , 'click .songlistRemove': function(e)
    {
        Meteor.call("removeSongFromPlaylist", { videoId: e.target.vid, playlistId: e.target.pid });
    }
});