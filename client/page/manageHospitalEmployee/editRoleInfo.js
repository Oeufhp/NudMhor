if(Meteor.isClient){
    Template.editRoleInfo.events({
        'submit #roleInfoForm':function(event){
            event.preventDefault();
            console.log('roleInfoForm is submitted');
            var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="
            var check = function(string){
                for(i = 0; i < specialChars.length;i++){
                    if(string.indexOf(specialChars[i]) > -1){
                        return true
                    }
                }
                return false;
            }
            let RoleEid=Session.get('userr').eid;
            let fname=event.target.fname.value.trim();
            let lname=event.target.lname.value.trim();
            let email=event.target.email.value.trim();
            let tel=event.target.tel.value.trim();
            let role=Session.get('userr').role;
            let department,specialize;
            if (event.target.department!=null){
              department = event.target.department.value;
            }
            if(event.target.specialize!=null){
              specialize = event.target.specialize.value.trim();
            }
            // fname checker
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
            // role checker
            if( role == ""){
                Bert.alert({title:'กรุณาระบุหน้าที่ของบุคลากร',type:'danger',style: 'growl-top-right'});
                return;
            }
            // doctor role department checker
            if(role == "doctor" && (department == "" || department == "ไม่ระบุแผนก")){
                Bert.alert({title:'กรุณาระบุแผนกของแพทย์',type:'danger',style: 'growl-top-right'});
                return;
            }
            // not doctor role department checker
            if(role != "doctor" && role != "" && (department != "ไม่ระบุแผนก")){
                Bert.alert({title:'แผนกของพยาบาล เจ้าหน้าที่ เภสัชกรและผู้ดูแลระบบจะต้องไม่ระบุแผนก',type:'danger',style: 'growl-top-right'});
                return;
            }
            // doctor specialize checker
            if(role == "doctor" && (specialize == "" || specialize.length > 255)){
                Bert.alert({title:'ความถนัดเฉพาะทางต้องมีความยาวไม่เกิน 255 ตัวอักษร',type:'danger',style: 'growl-top-right'});
                return;
            }
            //not doctor specialize checker
            if(role != "doctor" && role != "" && specialize != ""){
                Bert.alert({title:'สำหรับพยาบาล เจ้าหน้าที่ เภสัชกรและผู้ดูแลระบบไม่ต้องระบุความถนัดเฉพาะทาง',type:'danger',style: 'growl-top-right'});
                return;
            }
            console.log(department);
            console.log(specialize);
            Meteor.call('editRole',RoleEid,fname,lname,email,tel,role,department,specialize,function(err,usr){
                if(err){
                   Bert.alert({title:'การแก้ไขล้มเหลว อาจเป็นเพราะไม่มีบุคคลนี้ในระบบ',
                    type:'danger',style:'growl-top-right',icon: 'fa-warning'});
                }
                else{
                     Session.set('usr',usr);
                     Session.set('usr_role',role);
                     $('#editRoleInfoConfirmationModal').modal({backdrop: 'static', keyboard: false});
                }
            });
        },
        'click #editRoleGoBack':function(event){
            event.preventDefault();
            console.log("Going back");
            $('#editRoleInfoConfirmationModal').modal('hide');
            $('#deleteRoleConfirmationModal').modal('hide');
            Router.go('/home/admin');
        }
        
    });
    Template.editRoleInfo.helpers({
            user:function(){
                return Session.get('userr');
            },
            roleAdmin:function(){
                return Session.get('userr').role==="admin"?'selected':'';
            },
            roleDoctor:function(){
                return Session.get('userr').role==="doctor"?'selected':'';
            },
            roleNurse:function(){
                return Session.get('userr').role==="nurse"?'selected':'';
            },
            rolePharmacist:function(){
                return Session.get('userr').role==="pharmacist"?'selected':'';
            },
            roleReceptionist:function(){
                return Session.get('userr').role==="receptionist"?'selected':'';
            },
            editedUser:function(){
                return Session.get('usr');
            },
            usr_role:function(){
                let role = Session.get('usr_role');
                console.log("e_role",role);
                if(role == "admin") return "เจ้าหน้าที่ดูแลระบบ (Admin)";
                else if(role == "doctor") return "แพทย์ (Doctor)";
                else if(role == "nurse") return "พยาบาล (Nurse)";
                else if(role == "pharmacist") return "เภสัชกร (Pharmacist)";
                else if(role == "receptionist") return "เจ้าหน้าที่ต้อนรับ (Receptionist)";
            }
    });
}
