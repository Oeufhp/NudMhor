Template.body.events({
    'submit #recordExaminationForm': function(event){
      event.preventDefault();
      let patient_hn = event.target.patient_hn.value.toUpperCase();
      console.log(patient_hn);
      let patient = User.findOne({hn:patient_hn});
      if(patient==null){
        console.log("not found patient in db with this hn");
        Bert.alert({title:"ไม่พบรหัสประจำตัวผู้ป่วยนี้ ",type:"danger",style: 'growl-top-right'})
      }
      else{
        Session.setAuth('currentPatientHN',patient_hn);
        $('#ExaminationpatientSearch').modal('hide');
        Router.go('/recordExamination/ExaminationAppointmentList');
      }
    },
    'submit #recordExaminationConfirm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      let currentAppointmentID = Session.get('currentAppointmentID');
      let appt = Appointment.findOne(currentAppointmentID);
      let doctor = User.findOne({eid:appt.doctor_eid});
      let weight = event.target.weight.value;
      let height = event.target.height.value;
      let body_temp = event.target.body_temp.value;
      let blood_pressure = event.target.blood_pressure.value;
      let heart_rate = event.target.heart_rate.value;
      let exam_rec_obj = {
          examinationRecord : {
            weight :weight,
            height :height,
            body_temp: body_temp,
            blood_pressure: blood_pressure,
            heart_rate: heart_rate
          }
      }
      let name = doctor.fname+" "+doctor.lname;
      let appt_obj ={
        name2: name,
        department: appt.department,
        date:appt.date,
        time2:appt.round
      }
      Session.setAuth('exam_rec_obj',exam_rec_obj);
      Session.setAuth('appt_obj',appt_obj);
      console.log("exam_rec_obj : " + exam_rec_obj['examinationRecord']['weight']);
      $('#recordExaminationModal').modal('hide');
      $('#recordExaminationResultModal').modal({backdrop: 'static', keyboard: false});
    },
    'submit #recordExaminationResultButton': function(event){
      event.preventDefault();
      Meteor.call('updateExaminationRecord',Session.get('currentAppointmentID'),Session.get('exam_rec_obj'),function(err,result){
        if(err!=null){
            Bert.alert({title:"อัพเดทข้อมูลไม่สำเร็จ ",type:"danger",style: 'growl-top-right'})
        }
        else{
            Bert.alert({title:"อัพเดทข้อมูลก่อนการวินิจฉัยเรียบร้อย",type:"success",style: 'growl-top-right'})
        }
      })
      $('#recordExaminationResultModal').modal('hide');
      $('#recordExaminationSuccessModal').modal({backdrop: 'static', keyboard: false});
    }
});
