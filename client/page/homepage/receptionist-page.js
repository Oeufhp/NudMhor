Template.receptionistPage.onRendered(function(){
  let usr = Session.get('current_user');
  if(usr==null || usr.role!='receptionist'){
    Router.go('/');
    Router.go('/accessdenied');
  }
})
