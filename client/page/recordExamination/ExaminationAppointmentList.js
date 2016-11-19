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
  Template.ExaminationAppointmentList.events({
    'click .createExaminationBtn' : function(event){
      Session.setAuth('currentAppointmentID',$(event.target).data('app'));
      console.log("clicked 13:"+$(event.target).data('app'));
    }
  });
}
