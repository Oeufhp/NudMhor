if(Meteor.isClient){
  Template.body.events({
      'submit #viewDoctorScheduleForm': function(event){
        event.preventDefault();
        console.log('viewDoctorScheduleForm is submited');
        let doctorEid = event.target.doctorEid.value.trim();
        Meteor.call('searchDoctor',doctorEid,function(err,res){
          if(err){
              Bert.alert({title: 'รหัสพนักงานของแพทย์ที่ระบุไม่มีอยู่ในระบบ กรุณาระบุใหม่อีกครั้ง'
              , type: 'danger',style:'growl-top-right',icon: 'fa-key'});          
          }
          else{
            Meteor.call('getDoctorSchedule',doctorEid,function(err2,schedules){
              Session.set('schedules',schedules);
              $('#viewDoctorScheduleModal').modal('toggle');
              Router.go('/doctorSchedule');
            });
          }
        });//end of searchDoctor call
      },
  });

  Template.viewDoctorSchedule.helpers({
    schedules: function(){ return Session.get('schedules'); }
  });

  Template.registerHelper('equalTo',(a,b)=>{
    return a == b;
  });  
}



