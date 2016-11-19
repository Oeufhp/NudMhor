if(Meteor.isClient){ 

    Template.editPatientInfo.events({
        // '​click #edit-patientInfo-btn':function(){
        //     // event.preventDefault();
        //     Router.go('/viewPatientInfo/edit');
        // }
        'submit #editPatientInfoForm':function(){
            event.preventDefault();
            //for special character checking
            var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="
            var check = function(string){
                for(i = 0; i < specialChars.length;i++){
                    if(string.indexOf(specialChars[i]) > -1){
                        return true
                    }
                }
                return false;
            }
            let cUser = Session.get('current_user');
            let cid;
            if(cUser.role != 'patient') cid = Session.get('patientSearched').cid;
            else cid = cUser.cid;
            let fname = event.target.firstname.value.trim();
            let lname = event.target.lastname.value.trim();
            let email = event.target.email.value.trim();
            let tel = event.target.tel.value.trim();
            let drugAllergy = event.target.drugAllergy.value.trim();
            ///
            //fname
            if(check(fname) == true || fname.length > 20 || fname == ""){
                Bert.alert({title:'ชื่อจะต้องมีความยาวไม่เกิน 20 ตัวอักษรและไม่ประกอบด้วยอักขระพิเศษ',type:'danger',style: 'growl-top-right'});
                return;
            }
            // lname checker
            if(check(lname) == true || lname.length > 20 || lname == ""){
                Bert.alert({title:'นามสกุลจะต้องมีความยาวไม่เกิน 20 ตัวอักษรและไม่ประกอบด้วยอักขระพิเศษ',type:'danger',style: 'growl-top-right'});
                return;
            }
            // email checker
            if( /^[a-zA-Z0-9_.@]*$/.test(email) == false || email.length > 255 || email == ''){
                Bert.alert({title:'อีเมลต้องมีความยาวไม่เกิน 255 ตัวอักษร',type:'danger',style: 'growl-top-right'});
                return;
            }
            // mobile phone number checker
            if( /^[0-9]*$/.test(tel) == false || tel.length != 10 || tel == "" ){
                Bert.alert({title:'เบอร์ติดต่อต้องเป็นตัวเลข 10 ตัว',type:'danger',style: 'growl-top-right'});
                return;
            }
            // drug allergy checker
            if( check(drugAllergy) == true  || drugAllergy > 255 || drugAllergy == ""){
                Bert.alert({title:'ประวัติการแพ้ยาต้องมีความยาวไม่เกิน 255 ตัวอักษร',message:'หรือระบุว่า ไม่ทราบ ในกรณีที่ไม่ทราบ',type:'danger',style: 'growl-top-right'});
                return;
            }
            ///
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
