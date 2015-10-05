    var apiKey = "AIzaSyD-29IN9uHhfvIVgQw9foPpz31bMc0bGE0";
    var player;
    var dataApiReady = false;
    var iframeApiReady = false;
    var queuedVideo;
    
    function youtubeDataApiLoaded()
    {
        dataApiReady = true;
        /*
      var request = gapi.client.youtube.search.list({q: "Uptown Funk", maxResults: 1, part: 'snippet'});
      request.execute(function(response){
        console.log(response.result);
        for(var i in response.items)
        {
          var item = response.items[i];
          console.log(item);
          console.log(item.id.videoId + ": " + item.snippet.title);
          var frame = document.createElement("iframe");
          frame.width = 800;
          frame.height = 600;
          frame.src = 'https://www.youtube.com/embed/' + item.id.videoId + '?autoplay=1';
          document.body.appendChild(frame);
        }//<iframe width="560" height="315" src="https://www.youtube.com/embed/OPf0YbXqDm0" frameborder="0" allowfullscreen></iframe>
      });*/
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
    Template.musyncPlaylist.helper({
        playlistName: function()
        {
            //return 
        });
    Template.musyncPlaylist.events({
        'click #searchButton, keydown #searchButton': function(e){
             if(!dataApiReady){ document.getElementById('searchError').innerHTML = "Youtube Data API is not ready!"; return; }
            var request = gapi.client.youtube.search.list({q: document.getElementById('searchField').value, maxResults: 10, part: 'snippet'});
            request.execute(function(response)
            {
                var vRP = document.getElementById('videoResultParent');
                while (vRP.firstChild)
                {
                    vRP.removeChild(vRP.firstChild);
                }
                for(var i in response.items)
                {
                    var item = response.items[i];
                    console.log(item);
                    var row = document.createElement('tr');
                    vRP.appendChild(row);
                    var cell = document.createElement('td');
                    row.appendChild(cell);
                    var vName = document.createElement('p');
                    vName.innerHTML = item.snippet.title;
                    cell.appendChild(vName);
                    var vThumb = document.createElement('img');
                    vThumb.src = item.snippet.thumbnails.default.url;
                    cell.appendChild(vThumb);
                    var vAdd = document.createElement('div');
                    vAdd.style.cssText = 'width: 50px; height: 50px; background: rgb(230, 230, 230)';
                    vAdd.className = "videoAddButton";
                    vAdd.vId = item.id.videoId;
                    cell.appendChild(vAdd);
                    //var vAuthor = document.createElement('p');
                    //vName.innerHTML = item.snippet.title;
                    //cell.appendChild(vName);
                }
            });
        },
        'click div.videoAddButton': function(events){
            addSongToPlaylist(event.target.vId);
        }
        
        , 'click #songlistAdd': function(e)
        {
            Meteor.call('addSongToPlaylist', { videoId: , playlistId: Playlists.findOne().playlistId});
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