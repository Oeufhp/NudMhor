Meteor.methods({
    'updateDiagnosisRecord':function(appt_id,diagObject){
      let appt = Appointment.findOne(appt_id);
      if(appt!=null){
        Appointment.update(appt_id,{$set:{diagnosisRecord:diagObject}});
      }
      else{
        throw new Meteor.Error(400, "appointment not found");
      }
    }
});
