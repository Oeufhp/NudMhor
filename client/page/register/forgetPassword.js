if(Meteor.isClient){ 
  Template.forgetPassword.rendered=function() {
    $('#datepicker-forgetpass').datetimepicker({
			format:'DD/MMM/YYYY'
		});
  }
  Template.forgetPassword.events({
    'submit #forgetpass-next-form': function(event){
      event.preventDefault();
      console.log("next button press");
      let cid = event.target.forgetPassCID.value.trim();
      let birthdate = event.target.forgetPassBirthdate.value;
      console.log("cid: ",cid);
      console.log("bd: ",birthdate);
      if( /^[0-9]*$/.test(cid) == false || cid.length != 13 || cid == "" ){
        Bert.alert({title:'เลขบัตรประจำตัวประชาชนต้องเป็นตัวเลขจำนวน 13 ตัวติดกัน',type:'danger',style: 'growl-top-right'});
		  	return;
      }
      if( birthdate == ""){
			  Bert.alert({title:'กรุณาระบุวันเกิด',type:'danger',style: 'growl-top-right'});
			  return;
		  }
      Meteor.call('forgetPassword',cid,birthdate,function(err,result){
        if(err!=null){
				  Bert.alert({title: 'ข้อมูลที่ระบุไม่ถูกต้อง',type: 'danger',style: 'growl-top-right',icon: 'fa-times'});
        }
        else{
          //Router.go('/');
          Bert.alert({title: 'ยืนยันตัวตนเรียบร้อย',type: 'success',style: 'growl-top-right',icon: 'fa-check'});
          Session.set('forgetPassUser',result);
          Router.go('/forgetPassword/resetPassword');
        }
      });
    }
  });
}
// Template.body.events({
//   'click #forgetpass-next-btn' : function(event){
//     event.preventDefault();
//     Router.go('/forgetPassword/resetPassword');
//   }
// });