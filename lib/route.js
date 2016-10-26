Router.configure({
  // the default layout
  layoutTemplate: 'baseLayout'
  //loadingTemplate: "loadingPage",
  //notFoundTemplate: "404Page"
});

Router.route('/', function () {
  this.render('loginPage');
});

Router.route('/home/patient', function () {
  this.render('applicationLayout')
  this.render('patient-page',{to: 'appsection'})
});
Router.route('/home/doctor', function () {
  this.render('applicationLayout')
  this.render('doctor-page',{to: 'appsection'})
});
Router.route('/home/staff', function () {
  this.render('applicationLayout')
  this.render('staff-page',{to: 'appsection'})
});
Router.route('/home/nurse', function () {
  this.render('applicationLayout')
  this.render('nurse-page',{to: 'appsection'})
});
Router.route('/home/pharmacist', function () {
  this.render('applicationLayout')
  this.render('pharmacist-page',{to: 'appsection'})
});

Router.route('/makeappointment', function () {
  this.render('applicationLayout')
  this.render('makeappointment',{to: 'appsection'})
});

Router.route('/viewAppointment',function(){
  this.render('applicationLayout')
  this.render('viewAppointment',{to: 'appsection'})
});
