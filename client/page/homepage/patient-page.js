Template.patientPage.onRendered(function(){
  let usr = Session.get('current_user');
  if(usr==null || usr.role!='patient'){
    Router.go('/');
    Router.go('/accessdenied');
  }
})
