Template.body.events({
    'submit #viewTreatmentpatientSearchForm': function(event){
      event.preventDefault();
      let patient_hn = event.target.patient_hn.value.toUpperCase();
      let patient = User.findOne({hn:patient_hn});
      if (patient!=null){
        Session.set('currentPatientHN',patient_hn);
        $('#viewTreatmentpatientSearch').modal('hide');
        Router.go('/viewTreatmentRecord/veiwTreatmentRecordAppointmentList');
      }
      else{
        Bert.alert({title:"เลขประจำตัวผู้ป่วยไม่ถูกต้อง ",type:"danger",style: 'growl-top-right'})
      }
    }
});
Template.body.helpers({
  'getAppointmentDoccument':function(){
    if(Session.get('currentAppointmentID')!=null){
      let appt = Appointment.findOne(Session.get('currentAppointmentID'));
      return appt;
    }
  },
  'haveExaminationRecord': ()=>{
    if(Session.get('currentAppointmentID')!=null){
      let appt = Appointment.findOne(Session.get('currentAppointmentID'));
      if(appt.examinationRecord !=null){
        return true;
      }
    }
    return false;
  },
  'haveMedicinePrescription':()=>{
    if(Session.get('currentAppointmentID')!=null){
      let appt=Appointment.findOne(Session.get('currentAppointmentID'));
      if(appt.medicinePrescription!=null) return true;
    }
    return false;
  }
})
