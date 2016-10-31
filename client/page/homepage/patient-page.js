Template.body.events({
    'click #view-appt-div': function(event){
        // event.preventDefault();
        Router.go('/viewAppointment/results');
    }
});

