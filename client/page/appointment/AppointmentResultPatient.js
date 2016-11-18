Template.AppointmentResult.events({
    'click #view-btn': function(event){
        event.preventDefault();
        console.log("click apppointment:"+$(event.target).data('app'));
        Session.set('currentAppointmentID',$(event.target).data('app'));
    }
});
Template.AppointmentResult.helpers({
    'appointmentList': function(){
      let usr = Session.get('currentUser');
      if(usr==null || usr.role!="patient"){
        throw new Meteor.Error(400, 'Error 400: Wrong Request', 'no permission with currentUser');
      }
      return Appointment.find({patient_hn:usr.hn}).fetch();
    }
});
