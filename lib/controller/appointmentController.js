Meteor.methods({
  'createAppointment':function(patient_hn,doctor_hn,symptom,date,round){
      if (Appointment.find({doctor_hn:doctor_hn,date:date,round:round}).count()>0){
        throw new Meteor.Error(400, 'Error 400: Wrong Request', 'duplicated Appointment');
      }
      Appointment.insert({patient_hn:patient_hn,doctor_hn:doctor_hn,symptom:symptom,date:date,round:round});
  }
})
