Router.configure({
  // the default layout
  layoutTemplate: 'applicationLayout'
  //loadingTemplate: "loadingPage",
  //notFoundTemplate: "404Page"
});
Router.route('/',function(){
  this.layout('loginLayout')
  this.render('loginPage')
});
Router.route('/register',function(){
  this.layout('registerLayout')
  this.render('register')
});
Router.route('/home/patient', function () {
  this.render('patient-page',{to: 'appsection'})
});
Router.route('/home/doctor', function () {
  this.render('doctor-page',{to: 'appsection'})
});
Router.route('/home/staff', function () {
  this.render('staff-page',{to: 'appsection'})
});
Router.route('/home/nurse', function () {
  this.render('nurse-page',{to: 'appsection'})
});
Router.route('/home/pharmacist', function () {
  this.render('pharmacist-page',{to: 'appsection'})
});
Router.route('/home/admin', function () {
  this.render('admin-page',{to: 'appsection'})
});


Router.route('/makeappointment', function () {
  this.render('makeappointment',{to: 'appsection'})
});
Router.route('/viewAppointment',function(){
  this.render('viewAppointment',{to: 'appsection'})
});
Router.route('/viewAppointment/results',function(){
  this.render('AppointmentResult',{to: 'appsection'})
});

