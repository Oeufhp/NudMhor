Template.body.events({
    'submit #viewAppointmentForm': function(event){
        event.preventDefault();
        $('#viewAppointmentModal').modal('toggle');
        $('#viewAppointment2Modal').modal({backdrop: 'static', keyboard: false});
    },
    'click #appt-search-btn': function(event){
        event.preventDefault();
        Router.go('/viewAppointment/results');
        $('#viewAppointmentModal').modal('toggle');
     }
    ,
    'click #view-appt-div' : function(event){
        event.preventDefault();
        console.info("Patient View Appointment select");
        Router.go('/viewAppointment/results');
    }
});

Template.body.rendered=function(){
  $('#viewAppointmentModal').modal({backdrop: 'static', keyboard: false});
}
