Template.nursePage.onRendered(function(){
  let usr = Session.get('current_user');
  if(usr==null || usr.role!='nurse'){
    Router.go('/');
    Router.go('/accessdenied');
  }
})
