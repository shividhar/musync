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
                        var data = Session.set("songData");
                        data.title = response.items[0].snippet.title;
                        data.author = response.items[0].snippet.channelTitle;
                        data.thumb = response.items[0].snippet.thumbnails.default.url;
                    }
                }
            );
            
        }
        Session.set("songData" + this.songPosition, { title: "", author: "", thumb: "" });
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
        return Session.get("songData").title;
    }
    , "songThumb" : function()
    {
        return Session.get("songData").thumb;
    }
    , "songAuthor" : function()
    {
        return Session.get("songData").author;
    }
});