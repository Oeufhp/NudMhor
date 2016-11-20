if(Meteor.isClient){
  Template.viewTreatmentAppointmentList.events({
    'click .createViewRecordBtn':function(event){
      // Session.setAuth('currentAppointmentID',$(event.target).data('app'));
        event.preventDefault();
        Session.set('currentAppointmentID',$(event.target).data('app'));
    }
  });
}
