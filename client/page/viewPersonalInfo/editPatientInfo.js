if(Meteor.isClient){ 

    Template.editPatientInfo.events({
        // '​click #edit-patientInfo-btn':function(){
        //     // event.preventDefault();
        //     Router.go('/viewPatientInfo/edit');
        // }
        'submit #editPatientInfoForm':function(){
            event.preventDefault();
            
        },
    });

    Template.editPatientInfo.helpers({
        patientSearched:function(){
            return Session.get('patientSearched');
        },
        gender0:function(){
            let gender = Session.get('patientSearched').gender;
            if(gender == "male") return "checked";
        },
        gender1:function(){
            let gender = Session.get('patientSearched').gender;
            if(gender == "female") return "checked";
        },
    });

}
