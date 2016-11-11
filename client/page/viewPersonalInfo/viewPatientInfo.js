Template.body.events({
    // 'click #edit-patientInfo-btn':function(event){
    //     event.preventDefault();
    //     Router.go('/viewPatientInfo/edit');
    // },
    'submit #patientInfoForm':function(event){
        event.preventDefault();
        Router.go('/viewPatientInfo/edit');
    }    
});
