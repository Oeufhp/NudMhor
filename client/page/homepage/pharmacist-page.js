Template.pharmacistPage.onRendered(function(){
  let usr = Session.get('current_user');
  if(usr==null || usr.role!='pharmacist'){
    Router.go('/');
    Router.go('/accessdenied');
  }
})
