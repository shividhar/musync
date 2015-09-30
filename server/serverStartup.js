Meteor.startup(function () {
    if(Meteor.isServer){
        AccountsGuest.enabled = false
    }
})