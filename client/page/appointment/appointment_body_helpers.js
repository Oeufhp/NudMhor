Template.body.helpers({
    'currentAppointment': function(){
      return Appointment.findOne(Session.get('currentAppointmentID'));
    },
    'doctor_name':function(eid){
      let doc = User.findOne({eid:eid});
      if(doc==null) return;
      return doc.fname+" "+doc.lname;
    },
    'doctor_list': function(){
      return User.find({role:"doctor"}).fetch();
    },
    'random_doctor' :function(){
      let doctors = User.find({role:"doctor"}).fetch();
      let rand = parseInt(Math.random()*doctors.length);
      return doctors[rand];
    },
    'avaliable_time':function(){
      return DoctorSchedule.find({eid:Session.get('af_doctor_eid')}).fetch();
    },
    'avaliable_time2':function(eid){
      return DoctorSchedule.find({eid:eid}).fetch();
    },
    'best_time':function(){
      let schedule = DoctorSchedule.findOne({eid:Session.get('af_doctor_eid')},{sort: {date: 1}});
      return schedule;
    },
    'best_time2':function(eid){
      return DoctorSchedule.findOne({eid:eid},{sort: {date: 1}});
    }
});
