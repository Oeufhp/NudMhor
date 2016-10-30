Template.body.events({
    'submit #adddoctorscheduleForm': function(event){
      event.preventDefault();
      console.log('adddoctorscheduleForm is submited');
      $('#adddoctorscheduleModal').modal('toggle');
      $('#adddoctorscheduleModal2').modal({backdrop: 'static', keyboard: false});
    }
});

Template.body.rendered=function(){
  $('#datepicker-appt').datepicker().on('changeDate', function(ev){
    $(this).datepicker('hide');
  });
}
