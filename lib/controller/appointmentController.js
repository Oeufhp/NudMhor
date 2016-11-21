Meteor.methods({
  'createAppointment':function(patient_hn,doctor_eid,symptom,date,round,department){
      if (Appointment.find({patient_hn:patient_hn,doctor_eid:doctor_eid,date:date,round:round}).count()>0){
        throw new Meteor.Error(400, 'Error 400: Wrong Request', 'duplicated Appointment');
      }
      Appointment.insert({patient_hn:patient_hn,doctor_eid:doctor_eid,symptom:symptom,date:date,round:round,department:department});
  },
  'updateAppointment':function(id,date,round){
      let app = Appointment.findOne(id);
      if(date==app.date && round==app.round){
        return;
      }
      if (Appointment.find({patient_hn:app.patient_hn,doctor_eid:app.doctor_eid,date:date,round:round}).count()>0){
        throw new Meteor.Error(400, 'Error 400: Wrong Request', 'duplicated Appointment');
      }
      Appointment.update(id, {
        $set: { date:date,round:round},
      });
  },
  'removeAppointment':function(id){
    Appointment.remove(id);
  },
  'updateAppointmentwithPrescription':function(id,pres,){
    let app=Appointment.findOne({_id:id});
    // if(Appointment.find({patient_hn:app.patient_hn,doctor_eid:app.doctor_eid,date:date,round:round}).count()>0){
    //   throw new Meteor.Error(400, 'Error 400: Wrong Request', 'duplicated Appointment');
    // }
    Appointment.update({_id:id},{$set:{medicinePrescription:pres}});
  }
})
