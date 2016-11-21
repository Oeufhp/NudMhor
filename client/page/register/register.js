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
		if( password == "" ) {
			Bert.alert({title:'กรุณากรอกรหัสผ่าน',type:'danger',style: 'growl-top-right'});
			return;
		}
		if( /^[a-zA-Z0-9]*$/.test(password) == false || password.length>20 ) {
			Bert.alert({title:'รหัสผ่านต้องมีความยาวไม่เกิน 20 ตัวอักษร',type:'danger',style: 'growl-top-right'});
			return;
		}
		// fname checker
		if( fname == "" ) {
			Bert.alert({title:'กรุณากรอกชื่อของท่าน',type:'danger',style: 'growl-top-right'});
			return;
		}
		if(check(fname) == true || fname.length > 20 ){
			Bert.alert({title:'ชื่อจะต้องมีความยาวไม่เกิน 20 ตัวอักษรและไม่ประกอบด้วยอักขระพิเศษ',type:'danger',style: 'growl-top-right'});
			return;
		}
		// lname checker
		if( lname == "" ) {
			Bert.alert({title:'กรุณากรอกนามสกุลของท่าน',type:'danger',style: 'growl-top-right'});
			return;
		}
		if(check(lname) == true || lname.length > 20 ){
			Bert.alert({title:'นามสกุลจะต้องมีความยาวไม่เกิน 20 ตัวอักษรและไม่ประกอบด้วยอักขระพิเศษ',type:'danger',style: 'growl-top-right'});
			return;
		}
		// email checker
		if( email == "" ) {
			Bert.alert({title:'กรุณากรอกอีเมลขงท่าน',type:'danger',style: 'growl-top-right'});
			return;
		}
		if( /^[a-zA-Z0-9_.@]*$/.test(email) == false || email.length > 255 ){
			Bert.alert({title:'อีเมลต้องมีความยาวไม่เกิน 255 ตัวอักษร',type:'danger',style: 'growl-top-right'});
			return;
		}
		// mobile phone number checker
		if( tel == "" ) {
			Bert.alert({title:'กรุณากรอกเบอร์โทรศัพท์มือถือของท่าน',type:'danger',style: 'growl-top-right'});
			return;
		}
		if( /^[0-9]*$/.test(tel) == false || tel.length != 10 ){
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
		if( check(drugAllergy) == true  || drugAllergy > 255 ){
			Bert.alert({title:'ประวัติการแพ้ยาต้องมีความยาวไม่เกิน 255 ตัวอักษร',type:'danger',style: 'growl-top-right'});
			return;
		}
		if( drugAllergy == "" ){
			drugAllergy = 'ไม่ทราบ'
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
				Bert.alert({title: 'สมัครสมาชิกใหม่เรียบร้อย รหัส HN ของคุณคือ\n'+result.hn, hideDelay:5000,type: 'success',style: 'growl-top-right',icon: 'fa-check'});
				//send email
				let receiver = patient.email;
				let title = "ยืนยันการนัดหมายแพทย์ ของคุณ "+patient.fname;
				let context = "โรงพยาบาล นัดหมอ<br><br>";
				context =context +"รหัสผู้ป่วย : "+patient.hn+"     ชื่อ-นามสกุล ผู้ป่วย : "+patient.fname+" "+patient.lname+"<br>";
				context = context+ "วันเวลาที่นัด : "+date_format(date)+" "+time_format(round)+"<br>";
				context = context+"แพทย์ที่นัด : "+ doctor.fname+" "+doctor.lname+" แผนก : "+doctor.department+"<br>";
				context = context+"เบอร์โทรแผนก : 0XX-XXX-XXXX<br><br>";
				context = context+"หากท่านต้องการทำการเปลี่ยนแปลงการนัดหมายทำได้โดย<br>"+
				"1. เปลี่ยนแปลงการนัดหมายโดยตรงกับเจ้าหน้าทางโทรศัพท์<br>"+
				"2. ทำการเปลี่ยนแปลงด้วยตนเองผ่านเว็บไซต์ NudMhor.tk<br>";
				Meteor.call('sendEmail',receiver,'NudMhor System <lostunevol@gmail.com>',title,context)
			}
		});
    }
	});
}
Template.body.events({

})
