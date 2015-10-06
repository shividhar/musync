    var apiKey = "AIzaSyD-29IN9uHhfvIVgQw9foPpz31bMc0bGE0";
    var player;
    var dataApiReady = false;
    var iframeApiReady = false;
    var queuedVideo;
    
    function youtubeDataApiLoaded()
    {
        dataApiReady = true;
    }
    
// YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = function () {

        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        player = new YT.Player("player", {

            height: "400", 
            width: "600", 

            // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
            videoId: "", 

            // Events like ready, state change, 
            events: {

                onReady: function (event) {
                    iframeApiReady = true;
                }

            }

        });

    };

    // YT.load();
    
    Template.musyncPlaylist.created = function(){
          gapi.client.setApiKey(apiKey);
          gapi.client.load('youtube', 'v3').then(youtubeDataApiLoaded);
          var tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          document.head.appendChild(tag);
    }
    Template.musyncPlaylist.events({
        'click #searchButton, keydown #searchButton': function(e){

        },
        'click div.videoAddButton': function(events){
            addSongToPlaylist(event.target.vId);
        }
    })
    Template.musyncPlaylist.helpers({
        playlistName: function()
        {
            //return Session.get('playlists');
            //return 
            return 'test1';
        }
        , resultName: function()
        {
            return 'test2';
        }
        , resultThumb: function()
        {
            return 'http://wac.450f.edgecastcdn.net/80450F/hudsonvalleycountry.com/files/2015/01/cat4.jpg';
        }
        , 
    });
    Template.musyncPlaylist.events({
        'click #searchButton, keydown #searchButton': function(e){
             if(!dataApiReady){ document.getElementById('searchError').innerHTML = "Youtube Data API is not ready!"; return; }
            var request = gapi.client.youtube.search.list({q: document.getElementById('searchField').value, maxResults: 10, part: 'snippet'});
            request.execute(function(response)
            {
                for(var i in response.items)
                {
                    var item = response.items[i];
                }
            });
        }
        
        , 'click #songlistAdd': function(e)
        {
            Meteor.call('addSongToPlaylist', { videoId: e.target.vId, playlistId: Playlists.findOne().playlistId});
        }
        
        , 'click #songlistMoveUp': function(e)
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
    })