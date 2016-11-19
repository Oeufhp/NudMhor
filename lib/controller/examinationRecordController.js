Meteor.methods({
    'updateExaminationRecord':function(appt_id,exam_rec_obj){
      let appt = Appointment.findOne(appt_id);
      if(appt!=null){
        Appointment.update(appt_id,{$set:exam_rec_obj});
      }
      else{
        throw new Meteor.Error(400, "appointment not found");
      }
    }
});
