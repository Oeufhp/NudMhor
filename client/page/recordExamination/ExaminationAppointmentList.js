if(Meteor.isClient){
  Template.ExaminationAppointmentList.onRendered(function(){

  });

  Template.ExaminationAppointmentList.events({
    'click .createExaminationBtn' : function(event){
      Session.setAuth('currentAppointmentID',$(event.target).data('app'));
      console.log("clicked 13:"+$(event.target).data('app'));
    }
  });
}
