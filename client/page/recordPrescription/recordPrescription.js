Template.body.events({
    'submit #recordPrescriptionForm': function(event){
      event.preventDefault();
      console.log('recordPrescriptionForm is submited');
      $('#PrescriptionpatientSearch').modal('toggle');
      let patientHN=event.target.patientHN.value.trim();
      if(Appointment.find({patient_hn:patientHN}).fetch()===null){
        throw new Meteor.Error(400, 'Error 400: Wrong Request', 'no permission with currentUser');
      }
      Session.set('appointments',Appointment.find({patient_hn:patientHN}).fetch());
      Router.go('/recordPrescription/PrescriptionAppointmentList'); 
    },
    'submit #recordPrescriptionConfirm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      // $('#recordPrescriptionModal').modal('toggle');
      
    },
    'submit #recordPrescriptionResultButton': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordPrescriptionResultModal').modal('hide');
      $('#recordPrescriptionSuccessModal').modal({backdrop: 'static', keyboard: false});
    }
});

Template.body.helpers({
  
});