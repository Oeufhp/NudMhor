if(Meteor.isClient){
  Template.body.events({
      'submit #makeappointmentForm': function(event){
        event.preventDefault();
        console.log('makeappointmentForm is submited');
        Session.set('af_symptom',event.target.symptom.value);
        Session.set('af_doctor',event.target.doctor.value);
        Session.set('af_doctor_eid',$(event.target.doctor).find('option:selected').data('eid'));
        Session.set('af_department',event.target.department.value);
        $(".doctor").text(Session.get('af_doctor'));
        $(".symptom").text(Session.get('af_symptom'));
        $(".department").text(Session.get('af_department'));
        $('#makeappointmentModal').modal('hide');
        $('#makeappointmentModal2').modal({backdrop: 'static', keyboard: false});
      },
      'click #newdatetimeButton': function(event){
        console.log("click newdatetimeButton");
        $('#newdatetimeOption').toggle();
      },
      'change #newdatetimeOption':function(event){
        console.log('newdatetimeOption value has changed');
        $('.newdatetimeLabel').text($('#newdatetimeOption').val());
      },
      'submit #makeappointmentForm2': function(event){
        event.preventDefault();
        console.log('makeappointmentForm2 is submited');
        //patient_hn,doctor_hn,symptom,date,round
        let patient_hn = Session.get('currentUser').hn;
        let doctor_eid = Session.get('af_doctor_eid');
        let symptom = Session.get('af_symptom');
        let date = $(event.target.date).find('option:selected').data('date');
        let round =$(event.target.date).find('option:selected').data('time');
        let department = Session.get('af_department');
        Meteor.call('createAppointment',patient_hn,doctor_eid,symptom,date,round,department,function(err,result){
          if(err!=null){
            Bert.alert({title:"นัดหมายซ้ำซ้อน โปรดเลือกวันเวลาใหม่",type:"danger",style: 'growl-top-right'})
            $('#makeappointmentModal3').modal('hide');
            $('#makeappointmentModal2').modal({backdrop: 'static', keyboard: false});
          }
          else{
            Bert.alert({title:"สร้างการนัดหมายเรียบร้อยแล้ว",type:"success",style: 'growl-top-right'})
            $('.newdatetimeLabel').text($('#newdatetimeOption').val());
            $('#makeappointmentModal2').modal('hide');
            $('#choosenDoctorLabel').text();
            $('#makeappointmentModal3').modal({backdrop: 'static', keyboard: false});
          }
        });
      },
      'submit #makeappointmentSearchPatientForm': function(event){
        event.preventDefault();
        console.log('makeappointmentForm2 is submited');
        $('#makeappointmentSearchPatientModal').modal('hide');
        $('#makeappointmentModal').modal({backdrop: 'static', keyboard: false});
      }
  });
  Template.body.helpers({
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
    'best_time':function(){
      return DoctorSchedule.findOne({eid:Session.get('af_doctor_eid')},{sort: {date: 1}});
    }
  });
  Template.registerHelper('isEqual',function(obj1,obj2){
    return (obj1==obj2);
  });
  Template.registerHelper('date_format',function(date){
    return moment(date).format('DD MMM YYYY');
  });
  Template.registerHelper('time_format',function(time){
    if(time==0){
      return "ช่วงเช้า (8.00 - 12.00น.)";
    }
    if(time==1){
      return "ช่วงบ่าย (13.00 - 16.00น.)";
    }
  });
}
