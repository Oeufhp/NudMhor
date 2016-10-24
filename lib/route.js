Router.configure({
  // the default layout
  layoutTemplate: 'baseLayout'
  //loadingTemplate: "loadingPage",
  //notFoundTemplate: "404Page"
});

Router.route('/', function () {
  this.render('loginPage');
});

Router.route('/home', function () {
  this.render('applicationLayout')
  this.render('homepage',{to: 'appsection'})
});

Router.route('/makeappointment', function () {
  this.render('applicationLayout')
  this.render('makeappointment',{to: 'appsection'})
});

Router.route('/viewAppointment',function(){
  this.render('applicationLayout')
  this.render('viewAppointment',{to: 'appsection'})
});
