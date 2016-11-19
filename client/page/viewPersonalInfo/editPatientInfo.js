if(Meteor.isClient){ 

    Template.editPatientInfo.events({
        // '​click #edit-patientInfo-btn':function(){
        //     // event.preventDefault();
        //     Router.go('/viewPatientInfo/edit');
        // }
        'submit #editPatientInfoForm':function(){
            event.preventDefault();
            let cUser = Session.get('current_user');
            let cid;
            if(cUser.role != 'patient') cid = Session.get('patientSearched').cid;
            else cid = cUser.cid;
            let fname = event.target.firstname.value.trim();
            let lname = event.target.lastname.value.trim();
            let email = event.target.email.value.trim();
            let tel = event.target.tel.value.trim();
            let drugAllergy = event.target.drugAllergy.value.trim();
            Meteor.call('editPatientInfo',cid,fname,lname,email,tel,drugAllergy,function(err,res){
                if(err){
                    Bert.alert({title: 'Something went wrong!'
                      , type: 'danger',style:'growl-top-right',icon: 'fa-key'});                     
                }
                else{
                    Session.set('editedUser',res);
                    if(Session.get('current_user').role == 'patient')
                        Session.set('current_user',res);
                    $('#editPatientInfoConfirmationModal').modal({backdrop: 'static', keyboard: false}); 
                }
            });
        },
        'click #goBack2times': function(){
            event.preventDefault();
            $('editPatientInfoConfirmationModal').modal('hide');
            $('.modal-backdrop').remove();
            history.go(-2);
        }
    });

    Template.editPatientInfo.helpers({
        patientSearched:function(){
            let cUser = Session.get('current_user');
            if(cUser.role != 'patient')
                return Session.get('patientSearched');
            else return cUser;
        },
        // gender0:function(){
        //     let gender = Session.get('current_user').role == 'patient' ? 
        //         Session.get('current_user').gender: Session.get('patientSearched').gender ;
        //     if(gender == "male") return "checked";
        // },
        // gender1:function(){
        //     let gender = Session.get('current_user').role == 'patient' ? 
        //         Session.get('current_user').gender: Session.get('patientSearched').gender ;
        //     if(gender == "female") return "checked";
        // },
        editedUser:function(){
            return Session.get('editedUser');
        }
    });

}
