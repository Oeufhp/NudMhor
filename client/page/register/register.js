if(Meteor.isClient){
	Template.register.onRendered(function() {
		// $('#datepicker-register').datepicker({
    	// 	format: "dd/mm/yyyy",
    	// 	weekStart: 1,
    	// 	autoclose: true,
    	// 	toggleActive: true
		// });
		$('#datepicker-register').datetimepicker({
			format:'DD/MMM/YYYY'
		});
	})
	Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        console.log("register form is submitted");
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
		let cid = event.target.registerCID.value.trim();
		let password = event.target.registerPassword.value.trim();
		let email = event.target.email.value.trim();
		let fname = event.target.firstname.value.trim();
		let lname = event.target.lastname.value.trim();
		let tel = event.target.tel.value.trim();
		let gender = event.target.gender.value;
		let birthdate = event.target.birthdate.value;
		let drugAllergy = event.target.drugAllergy.value;
		console.log("drug",drugAllergy);
		// citizen ID checker
		if( /^[0-9]*$/.test(cid) == false || cid.length != 13 || cid == "" ){
			Bert.alert({title:'เลขบัตรประจำตัวประชาชนต้องเป็นตัวเลขจำนวน 13 ตัวติดกัน',type:'danger',style: 'growl-top-right'});
			return;
		}
		// password checker
		if( /^[a-zA-Z0-9]*$/.test(password) == false || password == "" || password.length>20) {
			Bert.alert({title:'รหัสผ่านต้องมีความยาวไม่เกิน 20 ตัวอักษร',type:'danger',style: 'growl-top-right'});
			return;
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
		// birthdate checker
		if( birthdate == ""){
			Bert.alert({title:'กรุณาระบุวันเกิด',type:'danger',style: 'growl-top-right'});
			return;
		}
		// gender checker
		if( gender == ""){
			Bert.alert({title:'กรุณาระบุเพศ',type:'danger',style: 'growl-top-right'});
			return;
		}
		// drug allergy checker
		if( check(drugAllergy) == true  || drugAllergy > 255 || drugAllergy == ""){
			Bert.alert({title:'ประวัติการแพ้ยาต้องมีความยาวไม่เกิน 255 ตัวอักษร',type:'danger',style: 'growl-top-right'});
			return;
		}
		//////////////////////////complete all checking////////////////////////////////
		let user = {cid:cid,password:password,email:email,fname:fname,lname:lname,tel:tel,gender:gender,birthdate:birthdate,drugAllergy:drugAllergy};
		Meteor.call('register',user,function(err,result){
			console.log("result : "+result);
			if(err!=null){
				Bert.alert({title: 'เลขบัตรประจำตัวประชาชนที่ระบุถูกใช้ไปแล้ว',type: 'danger',style: 'growl-top-right',icon: 'fa-key'});
			}
			else{
				Router.go('/');
				Bert.alert({title: 'Register successful',type: 'success',style: 'growl-top-right',icon: 'fa-check'});
			}
		});
    }
	});
}
Template.body.events({

})
