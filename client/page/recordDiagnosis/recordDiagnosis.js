Template.body.events({
    'submit #recordDiagnosisForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#recordDiagnosis').modal('hide');
      $('#recordDiagnosisConfirm').modal({backdrop: 'static', keyboard: false});
    },
    'submit #recordDiagnosisConfirmForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm2 is submited');
      $('#recordDiagnosisConfirm').modal('hide');
      $('#recordDiagnosisResult').modal({backdrop: 'static', keyboard: false});
    }
});
