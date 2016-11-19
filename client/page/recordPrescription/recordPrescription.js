Template.body.events({
    'submit #recordPrescriptionForm': function(event){
      event.preventDefault();
      console.log('recordPrescriptionForm is submited');
      $('#PrescriptionpatientSearch').modal('toggle');
      let patientHN=event.target.patientHN.value.trim();
      if(Appointment.find({patient_hn:patientHN}).count()===0){
        Bert.alert({title:'ค้นหาล้มเหลว',message:'ยังไม่ได้กรอกรหัสประจำตัวผู้ป่วย หรือ รหัสประจำตัวผู้ป่วยนี้ไม่มีในระบบ',type:'warning',style:'growl-top-right',icon:'fa-warning'});
      }
      else{
        Session.set('appointments',Appointment.find({patient_hn:patientHN}).fetch());
        Router.go('/recordPrescription/PrescriptionAppointmentList'); 
      }  
    },
    'submit #recordPrescriptionConfirmForm': function(event){
      event.preventDefault();
      console.log('recPresCon is submited');
      let medicineList =event.target.medicineList.value.trim();
      console.log(medicineList);
      Session.set('medicine',medicineList);
      $('#recordPrescriptionModal').modal('toggle');
      $('#recordPrescriptionResultModal').modal({backdrop: 'static', keyboard: false});
    },
    
    'submit #recordPrescriptionResultButton': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      let idAppt=Session.get('currentAppointmentID');
      Meteor.call('updateAppointmentwithPrescription',idAppt,medList,function(){
        console.log('updateAppointment is called');
        $('#recordPrescriptionResultModal').modal({backdrop: 'static', keyboard: false});
        Bert.alert({title:'Add prescription sucessful',type:'success',style:'growl-top-right',icon:'fa-check'});
        Session.set('appt',Appointment.findOne({_id:idAppt}));
      });
      $('#recordPrescriptionResultModal').modal('hide');
      $('#recordPrescriptionSuccessModal').modal({backdrop: 'static', keyboard: false});
    },
    'submit #edit-pres-btn':function(event){
      event.preventDefault();
      $('#recordPrescriptionSuccessModal').modal('toggle');
      $('#recordPrescriptionModal').modal({backdrop: 'static', keyboard: false});
    },
});

Template.body.helpers({
    appointment:function(){
      return Appointment.find({_id:Session.get('currentAppointmentID')});
    },
    doctorName:function(){
      Meteor.call('searchRole',appointment.doctor_eid,function(err,docName){
        return  docName;
      });
      return  docName;
      
    }
});