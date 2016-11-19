Template.body.events({
    'submit #viewAppointmentForm': function(event){
        event.preventDefault();
        let patient_hn = event.target.patient_hn.value.toUpperCase();
        let patient = User.findOne({hn:patient_hn});
        if(patient ==null){
          Bert.alert({title: 'ไม่มีผู้ป่วยนี้อยู่ในระบบ',
                        message:  'กรุณาระบุใหม่อีกครั้ง',message:"กรุณาระบุใหม่อีกครั้ง",type:"warning",style: 'growl-top-right',icon: 'fa-warning'});
        }
        else{
          Session.set('currentPatientHN',patient_hn);
          $('#viewAppointmentModal').modal('toggle');
          Router.go('/viewAppointment/results');
        }
    },
    'click #del-appt-btn' : function(event){
        event.preventDefault();
        $('#viewAppointmentModal3').modal('toggle');
        $('#viewAppointmentModal2').modal('toggle');
    },
    'click #changeDateTime-btn':function(event){
        event.preventDefault();
        $('#viewAppointmentModal2').modal('toggle');
        $('#viewAppointmentModal4').modal('toggle');
    },
    'submit #editAppointmentForm1':function(event){
      event.preventDefault();
      let id = Session.get('currentAppointmentID');
      let date =$(event.target.date).find('option:selected').data('date');
      console.log(date);
      let round =$(event.target.date).find('option:selected').data('time');
      Meteor.call('updateAppointment',id,date,round,function(err,result){
        if(err!=null){
          Bert.alert({title:"นัดหมายซ้ำซ้อน โปรดเลือกวันเวลาใหม่",type:"danger",style: 'growl-top-right'});
        }
        else{
          Bert.alert({title:"แก้ไขนัดการนัดหมายเรียบร้อย",type:"success",style: 'growl-top-right'});
          $('#viewAppointmentModal4').modal('toggle');
        }
      });
    },
    'click #confirm-del-btn':function(event){
      event.preventDefault();
      Meteor.call('removeAppointment',Session.get('currentAppointmentID'),function(err,result){
        if(err!=null){

        }
        else{
          Bert.alert({title:"ยกเลิกการนัดหมายเรียบร้อย",type:"success",style: 'growl-top-right'})
        }
      });
      $('#viewAppointmentModal3').modal('toggle');
    }
});
