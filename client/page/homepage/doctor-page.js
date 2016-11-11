Template.body.events({
    'submit #personalInfo-search-btn': function(event){
        event.preventDefault();
        Router.go('/viewPatientInfo');
        console.log('shit!!');
        window.location.href="/viewPatientInfo";
        //$('#viewAppointmentModal').modal('toggle');
    }

});

