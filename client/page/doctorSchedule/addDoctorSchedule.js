if(Meteor.isClient){

  Template.body.events({
      'submit #adddoctorscheduleForm': function(event){
        event.preventDefault();
        console.log('adddoctorscheduleForm is submited');
        let eid = event.target.eid.value.trim();
        let time = event.target.time.value;
        let date = event.target.date.value;
        if(eid == "" || time == "" || date == ""){
          Bert.alert({title: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'danger',style:'growl-top-right',icon: 'fa-times'});
          return;
        }
        Meteor.call('searchDoctor',eid,function(err,name){
          console.log('result : ' + name);
          if(err!=null){
            Bert.alert({title: 'รหัสพนักงานของแพทย์ที่ระบุไม่มีอยู่ในระบบ',
                        message: 'กรุณาระบุใหม่อีกครั้ง', type: 'warning',style:'growl-top-right',icon: 'fa-warning'});
          }
          else{
            Meteor.call('addDoctorSchedule',eid,date,time,function(err2,res){
              if(err2) Bert.alert({title: 'มีช่วงการออกตรวจในระบบแล้ว', type: 'success',style: 'growl-top-right',icon: 'fa-check'});
              else{
                $('#adddoctorscheduleModal').modal('toggle');
                $('#adddoctorscheduleModal2').modal({backdrop: 'static', keyboard: false});
                Session.set('name', name);
                if(time == 0) Session.set('time', 'ช่วงเช้า(9:00-12:00)');
                else Session.set('time', 'ช่วงบ่าย(13:00-16:00)');
                Session.set('date', date);
              }
            });

          }
        });//end of meteor.call
      },
      //old date picker -- remained in case of the new one fail
      // 'click #datepicker-adddoctorschedule':function(event){
      //     event.preventDefault();
      //     $('#datepicker-adddoctorschedule').datetimepicker({
      //       //format:'DD/MMM/YYYY'
      //     });
      // },
  });
  Template.body.helpers({
      name: function(){ return Session.get('name'); },
      time: function(){ return Session.get('time'); },
      date: function(){ return Session.get('date'); },
  });
  Template.body.rendered = function() {
      $('#datetimepicker-adddoctorschedule').datetimepicker({
        format:'YYYY-MM-DD',
      });
  }

}
