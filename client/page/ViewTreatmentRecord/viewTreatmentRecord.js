Template.body.events({
    'submit #viewTreatmentpatientSearchForm': function(event){
      event.preventDefault();
      console.log('makeappointmentForm is submited');
      $('#viewTreatmentpatientSearch').modal('hide');
      Router.go('/viewTreatmentRecord/veiwTreatmentRecordAppointmentList'); 
    }
});
