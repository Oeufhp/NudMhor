Template.body.events({
    'submit #recordPrescriptionForm': function(event){
      event.preventDefault();
      console.log('recordPrescriptionForm is submited');
      $('#PrescriptionpatientSearch').modal('toggle');
      let patientHN=event.target.patientHN.value.trim();
      if(Appointment.find({patient_hn:patientHN}).fetch()===null){
        throw new Meteor.Error(400, 'Error 400: Wrong Request', 'no permission with current_user');
      }
      else{
        Session.set('appointments',Appointment.find({patient_hn:patientHN}).fetch());
        Router.go('/recordPrescription/PrescriptionAppointmentList'); 
      }  
    },
    'submit #recordPrescriptionConfirmForm': function(event){
      event.preventDefault();
      console.log('recPresCon is submited');
      let medicineList =event.target.medicineList.value.trim();
      console.log(medicineList);
      Session.set('medicine',medicineList);
      Session.set('apptID',Session.get('currentAppointmentID'));
      $('#recordPrescriptionModal').modal('toggle');
      $('#recordPrescriptionResultModal').modal({backdrop: 'static', keyboard: false});
    },
    
    'submit #recordPrescriptionResultForm': function(event){
      event.preventDefault();
      console.log('chooseAppointmentButton is submited');
      let idAppt=Session.get('currentAppointmentID');
      let medList=Session.get('medicine');
      Meteor.call('updateAppointmentwithPrescription',idAppt,medList,function(){
        console.log('updateAppointment is called');
        $('#recordPrescriptionResultModal').modal({backdrop: 'static', keyboard: false});
        Bert.alert({title:'Add prescription sucessful',type:'success',style:'growl-top-right',icon:'fa-check'});
        Session.set('appt',Appointment.findOne({_id:idAppt}));
      });
      $('#recordPrescriptionResultModal').modal('toggle');
      $('#recordPrescriptionSuccessModal').modal({backdrop: 'static', keyboard: false});
    },
    'click #edit-pres-btn':function(event){
      event.preventDefault();
      $('#recordPrescriptionResultModal').modal('hide');
      $('#recordPrescriptionModal').modal('show');
    },
    'click #finish-btn':function(event){
      event.preventDefault();
      $('#recordPrescriptionResultModal').modal('hide');
      $('#recordPrescriptionModal').modal('hide');
      $('.modal-backdrop').remove();

    }
});

Template.body.helpers({
    'doctor':function(){
      let appointment= Appointment.findOne({_id:Session.get('apptID')});
      // console.log('attempt to find doctor');
      let doctorEid=appointment.doctor_eid;
      let doctor=User.findOne({eid:doctorEid});
      return doctor;
    },
    'appointment':function(){
      // console.log('attempt to find appointment');
      let appointment=Appointment.findOne({_id:Session.get('apptID')});
      return appointment;
    },
    'medicine':function(){
      return Session.get('medicine');
    }
    
});