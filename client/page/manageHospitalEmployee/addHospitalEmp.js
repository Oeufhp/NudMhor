if(Meteor.isClient){
  // Template.addHospitalEmp.onRendered(function(){
  //   $('#datepicker-addemployee').datetimepicker({
	// 		// format:'DD/MM/YYYY'
	// 	});
  // });
  Template.body.events({
    'submit #addEmployeeForm': function(event){
      event.preventDefault();
      console.log('addEmployeeForm is submited');
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
      let fname = event.target.firstname.value.trim();
			let lname = event.target.lastname.value.trim();
      let password = event.target.registerPassword.value.trim();
      let email = event.target.emailS.value.trim();
      let tel = event.target.tel.value.trim();
      let gender = event.target.gender.value;
      let birthdate = event.target.birthdate.value;
      let role = event.target.role.value;

      let department = event.target.department.value;
      let specialize = event.target.specialize.value;
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
     // not doctor specialize checker
     if(role != "doctor" && role != "" && specialize != ""){
        Bert.alert({title:'สำหรับพยาบาล เจ้าหน้าที่ เภสัชกรและผู้ดูแลระบบไม่ต้องระบุความถนัดเฉพาะทาง',type:'danger',style: 'growl-top-right'});
        return;
     }
      let user = {cid:cid,password:password,email:email,fname:fname,lname:lname,tel:tel,gender:gender,birthdate:birthdate,role:role,department:department,specialize:specialize};
      Meteor.call('addEmployee',user,function(err,result){
        console.log("result : "+result);
        if(err!=null){
          Bert.alert({title: 'รหัสบัตรประชาชนที่ระบุถูกใช้งานแล้ว',message: 'กรุณาใส่รหัสบัตรประชาชนใหม่',type: 'danger',style: 'growl-top-right',icon: 'fa-times'});
        }
        else{
          $('#addEmployeeModal').modal('hide');
          $('#addEmployeeModal2').modal({backdrop: 'static', keyboard: false});
          Bert.alert({title: 'เพิ่มบุคลากรเรียบร้อย',type: 'success',style: 'growl-top-right',icon: 'fa-check'});
          // Session.set('cid',cid);
          // Session.set('fname',fname);
          // Session.set('lname',lname);
          // Session.set('password',password);
          // Session.set('email',email);
          // Session.set('tel',tel);
          // Session.set('gender',gender);
          // Session.set('birthdate',birthdate);
          // Session.set('role',role);  
          // Session.set('eid',result);      
          Session.set('add_employee',user);
          Session.set('add_employee_eid',result); 
          Session.set('add_employee_role',role);
        }
      });
    },
    'click #datepicker-span':function(event){
      event.preventDefault();
      $('#datepicker-addemployee').datetimepicker({
        format:'DD/MMM/Y'
      });
    }
  });
  Template.body.helpers({
      // cid: function(){ return Session.get('cid'); },
      // fname: function(){ return Session.get('fname'); },
      // lname: function(){ return Session.get('lname'); },
      // pass: function(){ return Session.get('password'); },
      // email: function(){ return Session.get('email'); },
      // tel: function(){ return Session.get('tel'); },
      // gender: function(){ return Session.get('gender'); },
      // birthdate: function(){ return Session.get('birthdate'); },
      // role: function(){ return Session.get('role'); },
      // eid: function(){ return Session.get('eid'); },
      user: function(){ return Session.get('add_employee');},
      eid: function(){ return Session.get('add_employee_eid');},
      role: function(){
        let role = Session.get('add_employee_role');
        if(role == "admin") return "เจ้าหน้าที่ดูแลระบบ (Admin)";
        else if(role == "doctor") return "แพทย์ (Doctor)";
        else if(role == "nurse") return "พยาบาล (Nurse)";
        else if(role == "pharmacist") return "เภสัชกร (Pharmacist)";
        else if(role == "receptionist") return "เจ้าหน้าที่ต้อนรับ (Receptionist)";
      }
  });
}

