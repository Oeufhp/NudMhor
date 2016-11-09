if(Meteor.isClient){
	Template.register.onRendered(function() {
		// $('#datepicker-register').datepicker({
    	// 	format: "dd/mm/yyyy",
    	// 	weekStart: 1,
    	// 	autoclose: true,
    	// 	toggleActive: true
		// });
		$('#datepicker-register').datetimepicker({
			format:'DD/MM/YYYY'
		});
	})
	Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        console.log("register form is submitted");
        let cid = event.target.registerCID.value.trim();
        let password = event.target.registerPassword.value.trim();
				let email = event.target.email.value.trim();
				let fname = event.target.firstname.value.trim();
				let lname = event.target.lastname.value.trim();
				let tel = event.target.tel.value.trim();
				let gender = event.target.gender.value;
				let birthdate = event.target.birthdate.value;

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
				let user = {cid:cid,password:password,email:email,fname:fname,lname:lname,tel:tel,gender:gender,birthdate:birthdate};
				Meteor.call('register',user,function(err,result){
					console.log("result : "+result);
					if(err!=null){
						Bert.alert({title: 'Already used citizenID',type: 'danger',style: 'growl-top-right',icon: 'fa-key'});
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
