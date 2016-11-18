if(Meteor.isClient){ 

    Template.viewPatientInfo.events({
        // '​click #edit-patientInfo-btn':function(){
        //     // event.preventDefault();
        //     Router.go('/viewPatientInfo/edit');
        // }
        'click #viewPatientInfoGoBack': function(event){
            console.log("submitted back to home");
            event.preventDefault();
            thisRole = Session.get('currentUser').role;
            if(thisRole == 'nurse') Router.go('/home/nurse');
            else if(thisRole == 'patient') Router.go('/home/patient');
            else if(thisRole == 'doctor') Router.go('/home/doctor');
            else if(thisRole == 'receptionist') Router.go('/home/receptionist');
            else if(thisRole == 'pharmacist') Router.go('/home/pharmacist');
            else Router.go('/home/homepage');
        },    
    });

    Template.viewPatientInfo.helpers({
        patientSearched:function(){
            if(Session.get('currentUser').role != 'patient')
                return Session.get('patientSearched');
            else return Session.get('currentUser');
        },
        gender0:function(){
            let gender;
            if(Session.get('currentUser').role != 'patient')
                gender = Session.get('patientSearched').gender;
            else gender = Session.get('currentUser').gender;
            if(gender == "male") return "checked";
            else return "disabled";
        },
        gender1:function(){
            let gender;
            if(Session.get('currentUser').role != 'patient')
                gender = Session.get('patientSearched').gender;
            else gender = Session.get('currentUser').gender;
            if(gender == "female") return "checked";
            else return "disabled";
        },
    });

}
