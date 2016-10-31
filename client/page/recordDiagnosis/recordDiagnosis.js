Template.body.events({
    'submit #recordDiagnosisForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#recordDiagnosis').modal('hide');
      $('#recordDiagnosisConfirm').modal({backdrop: 'static', keyboard: false});
    },
    'click #newdatetimeButton': function(event){
      console.log("click newdatetimeButton");
      $('#newdatetimeOption').toggle();
    },
    'change #newdatetimeOption':function(event){
      console.log('newdatetimeOption value has changed');
      $('#newdatetimeLabel').text($('#newdatetimeOption').val());
    },
    'submit #recordDiagnosisConfirmForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm2 is submited');
      $('#recordDiagnosisConfirm').modal('hide');
      $('#choosenDoctorLabel').text();
      $('#recordDiagnosisResult').modal({backdrop: 'static', keyboard: false});
    }
});
