if(Meteor.isClient){
  Template.body.events({
      'submit #recordDiagnosisForm': function(event){
        event.preventDefault();
        console.log('recordDiagnosisForm is submited');
        let cid_hn = event.target.cid_hn.value.trim();
        Meteor.call('searchPatient',cid_hn,function(err,res){
          if(err){
            Bert.alert({title: 'ไม่มีผู้ป่วยนี้อยู่ในระบบ',
                        message:  'กรุณาระบุใหม่อีกครั้ง'
                , type: 'warning',style:'growl-top-right',icon: 'fa-warning'});
          }
          else{
            let rc_app = Appointment.findOne({
              patient_hn:res.hn,
              doctor_eid:Session.get('current_user').eid,
              date:moment(new Date()).format('YYYY-MM-DD')
            },{});
            if(rc_app == null){
              Bert.alert({title: 'ไม่มีการนัดหมายกับผู้ป่วยคนนี้ในวันนี้', type: 'warning',style:'growl-top-right',icon: 'fa-warning'});
            }
            else{
              Session.set('rc_appointment',  rc_app);         
              $('#DiagnosispatientSearch').modal('hide');
              //Router.go('/recordDiagnosis/DiagnosisAppointmentList');
              Session.set('searched_cid_hn',cid_hn);
              $('#recordDiagnosisModal').modal({backdrop: 'static', keyboard: false});
            }
          }
        });
      },
      'submit #recordDiagnosisConfirm': function(event){
        event.preventDefault();
        console.log('submited recordDiagnosisConfirm');
        Session.set('rc_symptom', event.target.symptom.value);
        Session.set('rc_medicine', event.target.medicine.value);
        if(Session.get('current_user').role != 'doctor'){
          Bert.alert({title: 'You not have permission!', type: 'danger',style:'growl-top-right',icon: 'fa-key'});
        }
        else{
          $('#recordDiagnosisModal').modal('hide');
          $('#recordDiagnosisResultModal').modal({backdrop: 'static', keyboard: false});
        }
      },
      'submit #recordDiagnosisResultButton': function(event){
        event.preventDefault();
        console.log('recordDiagnosisResultButton is submited');
        let diagObj = {
          symptom: Session.get('rc_symptom'),
          medicine: Session.get('rc_medicine')
        };
        Meteor.call('updateDiagnosisRecord', Session.get('rc_appointment'), diagObj, function(err,res){
          if(err!=null){
              Bert.alert({title:"อัพเดทข้อมูลไม่สำเร็จ ",type:"danger",style: 'growl-top-right'})
          }
          else{
              Bert.alert({title:"อัพเดทข้อมูลการวินิจฉัยเรียบร้อย",type:"success",style: 'growl-top-right'})
              $('#recordDiagnosisResultModal').modal('hide');
              $('#recordDiagnosisSuccessModal').modal({backdrop: 'static', keyboard: false});
          }         
        });
      },
      'click #editBtn':function(event){
        event.preventDefault();
        $('#recordDiagnosisResultModal').modal('hide');
        $('#recordDiagnosisModal').modal({backdrop: 'static', keyboard: false});
      }
  });

  Template.body.helpers({
    docName:function(){
      doctor = User.findOne({eid:Session.get('rc_appointment').doctor_eid});
      return doctor.fname + " " + doctor.lname;
    },
    deprt:function(){
      return Session.get('rc_appointment').department;
    },
    dateround:function(){
      let time = Session.get('rc_appointment').round;
      if(time==0){
        return Session.get('rc_appointment').date + " ช่วงเช้า (8.00 - 12.00น.)";
      }
      if(time==1){
        return Session.get('rc_appointment').date + " ช่วงบ่าย (13.00 - 16.00น.)";
      }      
    },
    rcd_symptom:function(){
      //console.log('helpers: rc_symptom');
      return Session.get('rc_symptom');
    },
    rcd_medicine:function(){
      return Session.get('rc_medicine');
    }
  });

  // Template.registerHelper('date_format',function(date){
  //   return moment(date).format('DD MMM YYYY');
  // });

}