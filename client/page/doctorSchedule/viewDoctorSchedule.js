Template.body.events({
    'submit #viewDoctorScheduleForm': function(event){
      event.preventDefault();
      console.log('viewDoctorScheduleForm is submited');
      $('#viewDoctorScheduleModal').modal('toggle');
      Router.go('/doctorSchedule');
    }
});

