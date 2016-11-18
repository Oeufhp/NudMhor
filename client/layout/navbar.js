if(Meteor.isClient){
  Template.navbar.events({
    'click .logout':function(event){
      Session.clearAuth();
      console.log("clicked logout");
      Router.go('/');
    }
  });
}
