Template.body.events({
    'submit #recordPrescriptionForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#PrescriptionpatientSearch').modal('hide');
      Router.go('/recordPrescription/PrescriptionAppointmentList'); 
    },
    'submit #recordPrescriptionConfirm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordPrescriptionModal').modal('hide');
      $('#recordPrescriptionResultModal').modal({backdrop: 'static', keyboard: false});
    },
    'submit #recordPrescriptionResultButton': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordPrescriptionResultModal').modal('hide');
      $('#recordPrescriptionSuccessModal').modal({backdrop: 'static', keyboard: false});
    }
});
