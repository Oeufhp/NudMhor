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
      let email = event.target.email.value.trim();
      let tel = event.target.tel.value.trim();
      let birthdate = event.target.birthdate.value;
      let role = event.traget.role.value;
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
      Meteor.call('addemployee',user,function(err,result){
        console.log("result : "+result);
        if(err!=null){
          Bert.alert({title: 'Already used citizenID',type: 'danger',style: 'growl-top-right',icon: 'fa-key'});
        }
        else{
          $('#addEmployeeModal').modal('hide');
          $('#addEmployeeModal2').modal({backdrop: 'static', keyboard: false});
          Bert.alert({title: 'Register successful',type: 'success',style: 'growl-top-right',icon: 'fa-check'});
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
}

