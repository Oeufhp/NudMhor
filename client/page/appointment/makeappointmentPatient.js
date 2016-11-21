  findEmptySlotOfDoctor = function(eid){
  let schedules = DoctorSchedule.find({eid:eid},{sort: {date: 1}}).fetch();
  let avaliable_slot = [];
  for(let i=0;i<schedules.length;i++){
    if(moment(new Date()).format('YYYY-MM-DD') <= moment(schedules[i].date).format('YYYY-MM-DD')){
      avaliable_slot.push({date:schedules[i].date,time:schedules[i].time});
    }
  }
  return avaliable_slot;
}
if(Meteor.isClient){
  Template.body.events({
      'submit #makeappointmentForm': function(event){
        event.preventDefault();
        console.log('makeappointmentForm is submited');
        Session.set('af_symptom',event.target.symptom.value);

        if(event.target.department.value=="notChooseDepartment"){
          Bert.alert({title:"กรุณาระบุแผนก",type:"danger",style: 'growl-top-right'})
          return;
        }
        Session.set('af_department',event.target.department.value);
        //check if not specific doctor
        let doctor_eid = $(event.target.doctor).find('option:selected').data('eid');
        if(doctor_eid=="noDoctorSpecific"){
          let doctors = User.find({department:event.target.department.value,role:"doctor"}).fetch();
          if(doctors.length==0){
            Bert.alert({title:"กรุณาระบุแพทย์",type:"danger",style: 'growl-top-right'})
            return;
          }
          else{
            let rand = parseInt(Math.random()*doctors.length);
            doctor_eid = doctors[rand].eid;
          }
        }
        Session.set('af_doctor_eid',doctor_eid);
        let doctor =User.findOne({eid:doctor_eid});
        if(doctor!=null){
          Session.set('af_doctor',doctor.fname+" "+doctor.lname);
        }
        console.log("doctor eid selected: "+doctor_eid);
        // check if no slot time in doctor
        let avaliable_slot = findEmptySlotOfDoctor(doctor_eid);
        if(avaliable_slot.length == 0 ){
          Bert.alert({title:"ไม่พบวันเวลาที่ว่างในตารางออกตรวจของแพทย์",type:"warning",style: 'growl-top-right'})
          return;
        }
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
            "2. ทำการเปลี่ยนแปลงด้วยตนเองผ่านเว็บไซต์ NudMhor.tk<br>";
            Meteor.call('sendEmail',receiver,'NudMhor System <lostunevol@gmail.com>',title,context);
            //send SMS
            let sms_tel = patient.tel;
            let sms_messages = "คุณ " + patient.fname + " ได้นัดหมายวันที่ " + date_format(date)+" "+time_format(round)+" "+doctor.department;
            Meteor.call('sendSMS',sms_tel,sms_messages);

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
        let depart = event.target.value;
        let doctors = User.find({department:depart,role:"doctor"}).fetch();
        $('.docList').remove();
        for(let i=0;i<doctors.length;i++){
          $('#doctorSelector').append("<option class='docList' data-eid='"+doctors[i].eid+"'>"+doctors[i].fname+" "+doctors[i].lname+"</option>")
        }
      }
  });
}
