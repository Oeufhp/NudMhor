Template.body.events({
    'submit #recordExaminationForm': function(event){
      event.preventDefault();
      let patient_hn = event.target.patient_hn.value.toUpperCase();
      console.log(patient_hn);
      let patient = User.findOne({hn:patient_hn});
      if(patient==null){
        console.log("not found patient in db with this hn");
        Bert.alert({title: 'รหัสผู้ป่วยที่ระบุไม่มีอยู่ในระบบ   กรุณาระบุใหม่อีกครั้ง'
        ,type:'warning',style:'growl-top-right',icon: 'fa-warning'});
      }
      else{
        Session.set('currentPatientHN',patient_hn);
        $('#ExaminationpatientSearch').modal('hide');
        Router.go('/recordExamination/ExaminationAppointmentList');
      }
    },
    'submit #recordExaminationConfirm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordExaminationModal').modal('hide');
      $('#recordExaminationResultModal').modal({backdrop: 'static', keyboard: false});
    },
    'submit #recordExaminationResultButton': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      $('#recordExaminationResultModal').modal('hide');
      $('#recordExaminationSuccessModal').modal({backdrop: 'static', keyboard: false});
    }
});
