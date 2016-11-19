Template.body.events({
    'submit #personalInfo-search-btn': function(event){
        event.preventDefault();
        Router.go('/viewPatientInfo');
        console.log('shit!!');
        window.location.href="/viewPatientInfo";
        //$('#viewAppointmentModal').modal('toggle');
    }
});
Template.doctorPage.onRendered(function(){
  let usr = Session.get('current_user');
  if(usr==null || usr.role!='doctor'){
    Router.go('/');
    Router.go('/accessdenied');
  }
})
