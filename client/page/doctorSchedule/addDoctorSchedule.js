Template.body.events({
    'submit #adddoctorscheduleForm': function(event){
      event.preventDefault();
      console.log('adddoctorscheduleForm is submited');
      $('#adddoctorscheduleModal').modal('toggle');
      $('#adddoctorscheduleModal2').modal({backdrop: 'static', keyboard: false});
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
      $('#makeappointmentModal2').modal('toggle');
      $('#choosenDoctorLabel').text();
      $('#makeappointmentModal3').modal({backdrop: 'static', keyboard: false});
    },
    'submit #makeappointmentForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#makeappointmentModal').modal('toggle');
      $('#makeappointmentModal2').modal({backdrop: 'static', keyboard: false});
    },
});

Template.body.rendered=function(){
  $('#datepicker-appt').datepicker().on('changeDate', function(ev){
    $(this).datepicker('hide');
  });
}
