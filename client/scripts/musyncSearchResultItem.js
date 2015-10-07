Template.musyncSearchResultItem.helpers({
    resultName: function()
    {
        return this.resultName;//'test2';
    }
    , resultAuthor: function()
    {
        return this.resultAuthor;//'test3';
    }
    , resultThumb: function()
    {
        return this.resultThumb;//'http://wac.450f.edgecastcdn.net/80450F/hudsonvalleycountry.com/files/2015/01/cat4.jpg';
    }
});

Template.musyncSearchResultItem.events({
    'click .songlistAdd': function(e)
    {
        Meteor.call('addSongToPlaylist', { videoId: e.target.vId, playlistId: Playlists.findOne().playlistId});
    }
});