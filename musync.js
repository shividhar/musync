if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 1);

  Template.splashPage.helpers({
    songList: function () {
        console.log(Random.hexString(6).toUpperCase())
    }
  });

  Template.splashPage.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
