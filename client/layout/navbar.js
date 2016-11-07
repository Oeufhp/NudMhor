if(Meteor.isClient){
  Template.navbar.events({
    'click .logout':function(event){
      Session.clearAuth();
      Router.go('/');
    }
  });
}
