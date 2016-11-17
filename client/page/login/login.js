if (Meteor.isClient) {
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
    $('#forgetpass-btn').click(function(event){
      event.preventDefault();
      Router.go('/forgetPassword');
    });
  });
  // Template.body.events({
  //    'click #forgetpass-btn': function(event){
  //     event.preventDefault();
  //     Router.go('/forgetPassword');

  //   }
  // });
  Template.loginPage.onRendered(function(){
    if(Session.get('currentUser')!=null){
      Router.go('/home/homepage');
    }
  });
  Template.loginPage.events({
    'submit form': function(event) {
        event.preventDefault();
        console.log("login form is submitted.");
        let username = event.target.loginCID.value.trim();
        let pass = event.target.loginPassword.value.trim();
        //for login with hn
        if(username.substring(0,2).toUpperCase() === 'HN'){
          username = username.toUpperCase();
          Meteor.call('loginWithHN',username,pass,function(err,result){
            if(err!=null){
              Bert.alert({title:"Wrong username/password ",type:"danger",style: 'growl-top-right'})
            }
            else{
              Session.setAuth('currentUser', result)
              Router.go('/home/homepage');
              // Bert.alert({title:"Login success",type:"success",style: 'growl-top-right'})
            }
          });
        }
        //for login with eid
        else if(username.substring(0,1).toUpperCase() === 'E'){
          username = username.toUpperCase();
          Meteor.call('loginWithEID',username,pass,function(err,result){
            if(err!=null){
              Bert.alert({title:"Wrong username/password ",type:"danger",style: 'growl-top-right'})
            }
            else{
              Session.setAuth('currentUser', result)
              Router.go('/home/homepage');
              // Bert.alert({title:"Login success",type:"success",style: 'growl-top-right'})
            }
          });

        }
        //for login with citizen id
        else{
          Meteor.call('loginWithCID',username,pass,function(err,result){
            if(err!=null){
              Bert.alert({title:"Wrong username/password ",type:"danger",style: 'growl-top-right'})
            }
            else{
              Session.setAuth('currentUser', result)
              Router.go('/home/homepage');
              // Bert.alert({title:"Login success",type:"success",style: 'growl-top-right'})
            }
          }); 
        }

        
    }
  });
}
Template.registerHelper('currentUser',function(){
  return Session.get('currentUser');
});
Template.loginPage.helpers({
  'alluser': function(){
    return User.find().fetch();
  }
});
