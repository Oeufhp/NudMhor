Template.loginPage.onRendered(function(){
  let margintop = ($(window).height()-500)/2;
  let str;
  if(margintop<=0){
    str = "10px";
  }
  else{
    str = margintop+"px";
  }
  $('.login-box').css('margin-top', margintop); 
});
Template.body.events({
   'click #forgetpass-btn': function(event){
    event.preventDefault();
    Router.go('/forgetPassword');

  } 
});
