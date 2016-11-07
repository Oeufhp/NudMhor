if(Meteor.isClient){
Template.body.events({
    'submit #makeappointmentForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#makeappointmentModal').modal('hide');
      $('#makeappointmentModal2').modal({backdrop: 'static', keyboard: false});
    },
    'click #newdatetimeButton': function(event){
      console.log("click newdatetimeButton");
      $('#newdatetimeOption').toggle();
    },
    'change #newdatetimeOption':function(event){
      console.log('newdatetimeOption value has changed');
      $('#newdatetimeLabel').text($('#newdatetimeOption').val());
    },
    'submit #makeappointmentForm2': function(event){
      event.preventDefault();
      console.log('makeappointmentForm2 is submited');
      $('#makeappointmentModal2').modal('hide');
      $('#choosenDoctorLabel').text();
      $('#makeappointmentModal3').modal({backdrop: 'static', keyboard: false});
    },
    'submit #makeappointmentSearchPatientForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm2 is submited');
      $('#makeappointmentSearchPatientModal').modal('hide');
      $('#makeappointmentModal').modal({backdrop: 'static', keyboard: false});
    }
});
}
