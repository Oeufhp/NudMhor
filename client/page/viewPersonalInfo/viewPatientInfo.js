Template.body.events({
    'submit #edit-patientInfo-btn':function(event){
        event.preventDefault();
        Router.go('/viewPatientInfo/edit');
    }    
});
