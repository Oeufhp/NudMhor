Template.viewTreatmentAppointmentList.events({
  'click .createViewRecordBtn':function(event){
    Session.setAuth('currentAppointmentID',$(event.target).data('app'));
  }
});
