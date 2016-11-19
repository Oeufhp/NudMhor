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
              patient_hn:Session.get('searchPatient'),
              doctor_eid:Session.get('currentUser').eid,
              date:moment(new Date()).format('DD MMM YYYY')
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
        if(Session.get('currentUser').role != doctor){
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
        $('#recordDiagnosisResultModal').modal('hide');
        $('#recordDiagnosisSuccessModal').modal({backdrop: 'static', keyboard: false});
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
      return Session.get('rc_appointment').date + " " + Session.get('rc_appointment').round;
    },
    symptom:function(){
      return Session.get('rc_symptom');
    },
    medicine:function(){
      return Session.get('rc_medicine');
    }
  });

  // Template.registerHelper('date_format',function(date){
  //   return moment(date).format('DD MMM YYYY');
  // });

}