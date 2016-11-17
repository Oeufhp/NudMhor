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
      let cid = event.target.registerCID.value.trim();
      let fname = event.target.firstname.value.trim();
			let lname = event.target.lastname.value.trim();
      let password = event.target.registerPassword.value.trim();
      let email = event.target.emailS.value.trim();
      let tel = event.target.tel.value.trim();
      let gender = event.target.gender.value;
      let birthdate = event.target.birthdate.value;
      let role = event.target.role.value;
      if(cid == "" || cid.length != 13) {
        Bert.alert({title:'กรุญาใส่รหัสบัตรประชาชน 13 หลัก',type:'danger',style: 'growl-top-right'});
        return;
      }
      if(password == ""||(password.length<6 || password.length>10) ){
        Bert.alert({title:'กรุณาใส่พาสเวิร์ด 6-10 หลัก',type:'danger',style: 'growl-top-right'});
        return;
      }
      if(email ==""||fname==""||lname==""||tel==""||gender==""||birthdate==""){
        Bert.alert({title:'กรุณากรอกข้อมูลให้ครบถ้วน',type:'danger',style: 'growl-top-right'});
        return;
      } 
      let user = {cid:cid,password:password,email:email,fname:fname,lname:lname,tel:tel,gender:gender,birthdate:birthdate,role:role};
      Meteor.call('addEmployee',user,function(err,result){
        console.log("result : "+result);
        if(err!=null){
          Bert.alert({title: 'Already used citizenID',type: 'danger',style: 'growl-top-right',icon: 'fa-key'});
        }
        else{
          $('#addEmployeeModal').modal('hide');
          $('#addEmployeeModal2').modal({backdrop: 'static', keyboard: false});
          Bert.alert({title: 'Register successful',type: 'success',style: 'growl-top-right',icon: 'fa-check'});
          Session.set('cid',cid);
          Session.set('fname',fname);
          Session.set('lname',lname);
          Session.set('password',password);
          Session.set('email',email);
          Session.set('tel',tel);
          Session.set('gender',gender);
          Session.set('birthdate',birthdate);
          Session.set('role',role);  
          Session.set('eid',result);       
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
      cid: function(){ return Session.get('cid'); },
      fname: function(){ return Session.get('fname'); },
      lname: function(){ return Session.get('lname'); },
      pass: function(){ return Session.get('password'); },
      email: function(){ return Session.get('email'); },
      tel: function(){ return Session.get('tel'); },
      gender: function(){ return Session.get('gender'); },
      birthdate: function(){ return Session.get('birthdate'); },
      role: function(){ return Session.get('role'); },
      eid: function(){ return Session.get('eid'); },
  });
}

