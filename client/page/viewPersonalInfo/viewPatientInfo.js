Template.body.events({
    'click #edit-patientInfo-btn':function(events){
        events.preventDefault();
        Router.go('/viewPatientInfo/edit');
    }    
});
