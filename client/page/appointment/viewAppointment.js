Template.body.events({
    'submit #viewAppointmentForm': function(event){
        event.preventDefault();
        $('#viewAppointment1Modal').modal('toggle');
        $('#viewAppointment2Modal').modal({backdrop: 'static', keyboard: false});
    }
});
Template.body.rendered=function(){
     $('#datepicker-appt').pickadate();
}
