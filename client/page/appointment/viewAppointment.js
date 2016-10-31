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
});

Template.body.rendered=function(){
  $('#viewAppointmentModal').modal({backdrop: 'static', keyboard: false});
}
