if(Meteor.isClient){
  Template.navbar.events({
    'click .logout':function(event){
      Session.clear();
      console.log("clicked logout");
      Router.go('/');
    }
  });
}
