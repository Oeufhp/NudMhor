Template.body.events({
    'submit #recordDiagnosisForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#patientSearch').modal('hide');
      Router.go('/recordDiagnosis/AppointmentList'); 
    },
    'submit #recordDiagnosisConfirm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordDiagnosisModal').modal('hide');
      $('#recordDiagnosisResultModal').modal({backdrop: 'static', keyboard: false});
    }
});
