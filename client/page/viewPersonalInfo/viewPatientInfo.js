if(Meteor.isClient){ 

    Template.viewPatientInfo.events({
        'click #edit-patientInfo-btn': function(event){
            event.preventDefault();
            Router.go('/viewPatientInfo/edit');
        },
        'click #viewPatientInfoGoBack': function(event){
            console.log("submitted back to home");
            event.preventDefault();
            thisRole = Session.get('current_user').role;
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
            if(Session.get('current_user').role != 'patient')
                return Session.get('patientSearched');
            else return Session.get('current_user');
        },
        gender0:function(){
            let gender;
            if(Session.get('current_user').role != 'patient')
                gender = Session.get('patientSearched').gender;
            else gender = Session.get('current_user').gender;
            if(gender == "male") return "checked";
            else return "disabled";
        },
        gender1:function(){
            let gender;
            if(Session.get('current_user').role != 'patient')
                gender = Session.get('patientSearched').gender;
            else gender = Session.get('current_user').gender;
            if(gender == "female") return "checked";
            else return "disabled";
        },
        disable:function(){
            let role = Session.get('current_user').role;
            if(role == 'patient' || role == 'receptionist'){
                return "";
            }
            else{
                return "disabled";
            }
            
        },
    });

}
