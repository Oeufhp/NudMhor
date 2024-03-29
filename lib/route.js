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
  this.render('patientPage',{to: 'appsection'})
});
Router.route('/home/doctor', function () {
  this.render('doctorPage',{to: 'appsection'})
});
Router.route('/home/receptionist', function () {
  this.render('receptionistPage',{to: 'appsection'})
});
Router.route('/home/nurse', function () {
  this.render('nursePage',{to: 'appsection'})
});
Router.route('/home/pharmacist', function () {
  this.render('pharmacistPage',{to: 'appsection'})
});
Router.route('/home/admin', function () {
  this.render('adminPage',{to: 'appsection'})
});
Router.route('/home/homepage', function () {
  let usr = Session.get('current_user');
  console.log(usr.role);
  if(usr!=null && usr.role=='patient'){
    this.render('patientPage',{to:'appsection'});
  }
  else if(usr!=null && usr.role=='admin'){
    this.render('adminPage',{to:'appsection'});
  }
  else if(usr!=null && usr.role=='doctor'){
    this.render('doctorPage',{to:'appsection'});
  }
  else if(usr!=null && usr.role=='nurse'){
    this.render('nursePage',{to:'appsection'});
  }
  else if(usr!=null && usr.role=='pharmacist'){
    this.render('pharmacistPage',{to:'appsection'});
  }
  else if(usr!=null && usr.role=='receptionist'){
    this.render('receptionistPage',{to:'appsection'});
  }
  else{
    this.render('homepage',{to: 'appsection'})
  }
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

Router.route('/doctorSchedule',function(){
  this.render('viewDoctorSchedule',{to: 'appsection'})
});

Router.route('/viewTreatmentRecord/veiwTreatmentRecordAppointmentList',function(){
  this.render('viewTreatmentAppointmentList',{to: 'appsection'})
});
Router.route('/searchForviewPersonalInfo',function(){
  this.render('searchForviewPersonalInfo',{to: 'appsection'})
})

Router.route('/viewPatientInfo',function(){
  this.render('viewPatientInfo',{to: 'appsection'})
})
Router.route('/viewPatientInfo/edit',function(){
  this.render('editPatientInfo',{to: 'appsection'})
})

Router.route('/DoctorInfo',function(){
  this.render('DoctorInfo',{to: 'appsection'})
})

Router.route('/RoleInfo',function(){
  this.render('RoleInfo',{to: 'appsection'})
})

Router.route('/RoleInfo/edit',function(){
  this.render('editRoleInfo',{to: 'appsection'})
})

Router.route('/accessdenied',function(){
  this.render('accessdenied',{to: 'appsection'})
})
