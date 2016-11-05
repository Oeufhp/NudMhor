Template.body.events({
    'submit #recordDiagnosisForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#DiagnosispatientSearch').modal('hide');
      Router.go('/recordDiagnosis/DiagnosisAppointmentList'); 
    },
    'submit #recordDiagnosisConfirm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordDiagnosisModal').modal('hide');
      $('#recordDiagnosisResultModal').modal({backdrop: 'static', keyboard: false});
    },
    'submit #recordDiagnosisResultButton': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordDiagnosisResultModal').modal('hide');
      $('#recordDiagnosisSuccessModal').modal({backdrop: 'static', keyboard: false});
    }
});
