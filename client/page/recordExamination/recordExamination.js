Template.body.events({
    'submit #recordExaminationForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#ExaminationpatientSearch').modal('hide');
      Router.go('/recordExamination/ExaminationAppointmentList'); 
    },
    'submit #recordExaminationConfirm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordExaminationModal').modal('hide');
      $('#recordExaminationResultModal').modal({backdrop: 'static', keyboard: false});
    },
    'submit #recordExaminationResultButton': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordExaminationResultModal').modal('hide');
      $('#recordExaminationSuccessModal').modal({backdrop: 'static', keyboard: false});
    }
});
