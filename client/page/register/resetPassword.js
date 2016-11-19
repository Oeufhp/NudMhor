if(Meteor.isClient){ 
    Template.resetPassword.rendered=function(){

    }
    Template.resetPassword.events({
        'submit #setNewPassword-form': function(event){
            event.preventDefault();
            console.log("next button press");
            let user = Session.get('forgetPassUser');
            let newPass = event.target.newPassword.value.trim();
            let newPassConfirm = event.target.newPasswordConfirm.value.trim();
            console.log(user);
            console.log(newPass);
            console.log(newPassConfirm);
            if( /^[a-zA-Z0-9]*$/.test(newPass) == false || newPass == "" || newPass.length>20) {
			    Bert.alert({title:'รหัสผ่านต้องมีความยาวไม่เกิน 20 ตัวอักษร',type:'danger',style: 'growl-top-right'});
			    return;
		    }
            if(newPass == newPassConfirm){
                console.log("new password matched");
                Meteor.call('setNewPassword',user.cid,newPass,function(err,result){
                    Bert.alert({title: 'เปลี่ยนรหัสผ่านใหม่เรียบร้อย',type: 'success',style: 'growl-top-right',icon: 'fa-check'});
                    console.log(result);
                    Router.go('/');
                });
            }
            else{
                Bert.alert({title:'ยืนยันรหัสผ่านไม่ตรงกัน',type:'danger',style: 'growl-top-right'});
			    return;
            }
        }
    });
}