Template.AppointmentResult.events({
    'click #view-btn': function(event){
        event.preventDefault();
        // console.log("click apppointment:"+$(event.target).data('app'));
        Session.set('currentAppointmentID',$(event.target).data('app'));
    }
});
Template.AppointmentResult.helpers({
    'appointmentList': function(){
      let usr = Session.get('current_user');
      if(usr != null && usr.role=="patient"){
        return Appointment.find({patient_hn:usr.hn}).fetch();
      }
      else{
        let patient_hn = Session.get('currentPatientHN');
        return Appointment.find({patient_hn:patient_hn}).fetch();
      }
    }
});
