Template.AppointmentResult.events({
    'click #view-btn': function(event){
        event.preventDefault();
        // console.log("click apppointment:"+$(event.target).data('app'));
        Session.set('currentAppointmentID',$(event.target).data('app'));
    }
});
Template.AppointmentResult.helpers({
    'appointmentList': function(){
        console.log("hello debug");
      let usr = Session.get('current_user');
      let appointment;
      if(usr != null && usr.role=="patient"){
        appointments = Appointment.find({patient_hn:usr.hn}).fetch();
      }
      else{
        let patient_hn = Session.get('currentPatientHN');
        appointments = Appointment.find({patient_hn:patient_hn}).fetch();
      }
      appointments.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
      });
      console.log(appointments);
      return appointments;
    }
});
