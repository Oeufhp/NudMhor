Template.body.helpers({
    'currentAppointment': function(){
      return Appointment.findOne(Session.get('currentAppointmentID'));
    },
    'doctor_name':function(eid){
      let doc = User.findOne({eid:eid});
      if(doc==null) return;
      return doc.fname+" "+doc.lname;
    },
    // 'doctor_list': function(){
    //   let depart = Session.get('selectedDepart');
    //   //let depart = $('#departmentSelector option:selected').text();
    //   console.log('finding doctor');
    //   console.log(User.find({role:"doctor",department:depart}).fetch());
    //   return User.find({role:"doctor",department:depart}).fetch();
    // },
    'random_doctor' :function(){
      let doctors = User.find({role:"doctor"}).fetch();
      let rand = parseInt(Math.random()*doctors.length);
      return doctors[rand];
    },
    'avaliable_time':function(){
      let avaliable_slot = findEmptySlotOfDoctor(Session.get('af_doctor_eid'));
      return avaliable_slot;
    },
    'avaliable_time_by_eid':function(eid){
      let avaliable_slot = findEmptySlotOfDoctor(eid);
      return avaliable_slot;
    },
    'best_time':function(){
      let avaliable_slot = findEmptySlotOfDoctor(Session.get('af_doctor_eid'));
      if(avaliable_slot.length>0){
        return avaliable_slot[0];
      }
      else{
        return null;
      }
    },
    'best_time_by_eid':function(eid){
      let avaliable_slot = findEmptySlotOfDoctor(eid);
      if(avaliable_slot.length>0){
        return avaliable_slot[0];
      }
      else{
        return null;
      }
    }
});
