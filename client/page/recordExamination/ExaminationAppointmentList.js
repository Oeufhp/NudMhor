if(Meteor.isClient){
  Template.ExaminationAppointmentList.onRendered(function(){

  });
  Template.ExaminationAppointmentList.helpers({
    'appointmentList' : function(){
      let patient_hn = Session.get('currentPatientHN');
      let appointmentList = Appointment.find({hn:patient_hn}).fetch();
      return appointmentList;
    }
  });
}
