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
Router.route('/forgetPassword',function(){
  this.layout('forgetPasswordLayout')
  this.render('forgetPassword')
});

Router.route('/forgetPassword/resetPassword',function(){
  this.layout('resetPasswordLayout')
  this.render('resetPassword')
});

Router.route('/home/patient', function () {
  this.render('patient-page',{to: 'appsection'})
});
Router.route('/home/doctor', function () {
  this.render('doctor-page',{to: 'appsection'})
});
Router.route('/home/receptionist', function () {
  this.render('receptionist-page',{to: 'appsection'})
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
Router.route('/home/homepage', function () {
  this.render('homepage',{to: 'appsection'})
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

Router.route('/recordDiagnosis/DiagnosisAppointmentList',function(){
  this.render('DiagnosisAppointmentList',{to: 'appsection'})
});

Router.route('/recordExamination/ExaminationAppointmentList',function(){
  this.render('ExaminationAppointmentList',{to: 'appsection'})
});

Router.route('/recordPrescription/PrescriptionAppointmentList',function(){
  this.render('PrescriptionAppointmentList',{to: 'appsection'})
});

