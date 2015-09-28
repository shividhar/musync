Meteor.startup(function () {
    Router.configure({
        // notFoundTemplate: 'notFound',
        // trackPageView: true
    });

    Router.map(function() {
        this.route("splashPage", {
            path: "/",
            template: "splashPage"
        })
    })
})