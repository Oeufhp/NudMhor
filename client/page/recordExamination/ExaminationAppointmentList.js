if(Meteor.isClient){
  Template.ExaminationAppointmentList.onRendered(function(){

  });
  Template.ExaminationAppointmentList.helpers({
    'appointmentList' : function(){
      let patient_hn = Session.get('currentPatientHN');
      let appt_list = Appointment.find({patient_hn:patient_hn}).fetch();
      return appt_list;
    }
  });
}
