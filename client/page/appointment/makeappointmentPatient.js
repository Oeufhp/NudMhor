if(Meteor.isClient){
  Template.body.events({
      'submit #makeappointmentForm': function(event){
        event.preventDefault();
        console.log('makeappointmentForm is submited');
        Session.set('af_symptom',event.target.symptom.value);
        Session.set('af_doctor',event.target.doctor.value);
        let doctor_eid = $(event.target.doctor).find('option:selected').data('eid');
        Session.set('af_doctor_eid',doctor_eid);
        console.log("doctor eid selected: "+doctor_eid);
        let schedules = DoctorSchedule.find({eid:doctor_eid}).fetch();
        let haveFutureSlot = false;
        for(let i=0;i<schedules.length;i++){
          if(schedules[i].date > new Date()){
            haveFutureSlot =true;
            break;
          }
        }
        if(haveFutureSlot ==false ){
          Bert.alert({title:"ไม่พบวันเวลาที่ว่างในตารางออกตรวจของแพทย์",type:"warning",style: 'growl-top-right'})
          return;
        }
        Session.set('af_department',event.target.department.value);
        $(".doctor").text(Session.get('af_doctor'));
        $(".symptom").text(Session.get('af_symptom'));
        $(".department").text(Session.get('af_department'));
        $('#makeappointmentModal').modal('hide');
        $('#makeappointmentModal2').modal({backdrop: 'static', keyboard: false});
      },
      'click #newdatetimeButton': function(event){
        console.log("click newdatetimeButton");
        $('#newdatetimeOption').toggle();
      },
      'change #newdatetimeOption':function(event){
        console.log('newdatetimeOption value has changed');
        $('.newdatetimeLabel').text($('#newdatetimeOption').val());
      },
      'submit #makeappointmentForm2': function(event){
        event.preventDefault();
        console.log('makeappointmentForm2 is submited');
        //patient_hn,doctor_hn,symptom,date,round
        let patient_hn = Session.get('current_user').hn;
        if(patient_hn == null){
          patient_hn = Session.get('currentPatientHN');
        }
        let patient = User.findOne({hn:patient_hn});
        if( patient ==null) {
          Bert.alert({title:"ไม่สามารถสร้างการนัดหมายได้",type:"danger",style: 'growl-top-right'})
          return;
        }
        let doctor_eid = Session.get('af_doctor_eid');
        let doctor = User.findOne({eid:doctor_eid});
        let symptom = Session.get('af_symptom');
        let date = $(event.target.date).find('option:selected').data('date');
        let round =$(event.target.date).find('option:selected').data('time');
        let department = Session.get('af_department');
        Meteor.call('createAppointment',patient_hn,doctor_eid,symptom,date,round,department,function(err,result){
          if(err!=null){
            Bert.alert({title:"นัดหมายซ้ำซ้อน โปรดเลือกวันเวลาใหม่",type:"danger",style: 'growl-top-right'})
            $('#makeappointmentModal3').modal('hide');
            $('#makeappointmentModal2').modal({backdrop: 'static', keyboard: false});
          }
          else{
            Bert.alert({title:"สร้างการนัดหมายเรียบร้อยแล้ว",type:"success",style: 'growl-top-right'})
            $('.newdatetimeLabel').text($('#newdatetimeOption').val());
            $('#makeappointmentModal2').modal('hide');
            $('#choosenDoctorLabel').text();
            $('#makeappointmentModal3').modal({backdrop: 'static', keyboard: false});
            //send Email
            let receiver = patient.email;
            let title = "ยืนยันการนัดหมายแพทย์ ของคุณ "+patient.fname;
            let context = "โรงพยาบาล นัดหมอ<br><br>";
            context =context +"รหัสผู้ป่วย : "+patient.hn+"     ชื่อ-นามสกุล ผู้ป่วย : "+patient.fname+" "+patient.lname+"<br>";
            context = context+ "วันเวลาที่นัด : "+date_format(date)+" "+time_format(round)+"<br>";
            context = context+"แพทย์ที่นัด : "+ doctor.fname+" "+doctor.lname+" แผนก : "+doctor.department+"<br>";
            context = context+"เบอร์โทรแผนก : 0XX-XXX-XXXX<br><br>";
            context = context+"หากท่านต้องการทำการเปลี่ยนแปลงการนัดหมายทำได้โดย<br>"+
            "1. เปลี่ยนแปลงการนัดหมายโดยตรงกับเจ้าหน้าทางโทรศัพท์<br>"+
            "2. ทำการเป ลี่ยนแปลงด้วยตนเองผ่านเว็บไซต์ NudMhor.tk<br>";
            Meteor.call('sendEmail',receiver,'NudMhor System <lostunevol@gmail.com>',title,context)
          }
        });
      },
      'submit #makeappointmentSearchPatientForm': function(event){
        event.preventDefault();
        let patient_hn = event.target.patient_hn.value.toUpperCase();
        let patient = User.findOne({hn:patient_hn});
        if(patient == null){
          Bert.alert({title:"ไม่พบรหัสประจำตัวผู้ป่วยนี้",type:"danger",style: 'growl-top-right'})
        }
        else{
          Session.set('currentPatientHN',patient_hn);
          $('#makeappointmentSearchPatientModal').modal('hide');
          $('#makeappointmentModal').modal({backdrop: 'static', keyboard: false});
        }
      },
      'change #departmentSelector':function(event){
        console.log('click selector');
        let depart = $('#departmentSelector option:selected').text();
        Session.set('selectedDepart',depart);
      }
  });
}
