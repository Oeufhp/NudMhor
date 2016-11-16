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
    },   
    'click #del-appt-btn' : function(event){
        event.preventDefault();
        $('#viewAppointmentModal3').modal('toggle');
        $('#viewAppointmentModal2').modal('toggle');
    },
    'click #changeDateTime-btn': function(event){
      $('#changedatetimeOption').toggle();
      $('#confirmChange-btn').toggle();
    }
});
