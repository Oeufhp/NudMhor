Template.body.events({
    'click #doctorSchedule-btn': function(event){
        event.preventDefault();
        Router.go('/home/doctor/doctorSchedule');
        //$('#viewAppointmentModal').modal('toggle');
    }

});

