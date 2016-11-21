if(Meteor.isClient){
  Template.body.events({
      'submit #viewDoctorScheduleForm': function(event){
        event.preventDefault();
        console.log('viewDoctorScheduleForm is submited');
        let doctorEid = event.target.doctorEid.value.trim();
        Meteor.call('searchDoctor',doctorEid,function(err,res){
          if(err){
              Bert.alert({title: 'รหัสพนักงานของแพทย์ที่ระบุไม่มีอยู่ในระบบ กรุณาระบุใหม่อีกครั้ง'
              , type:'warning',style:'growl-top-right',icon: 'fa-warning'});        
          }
          else{
            Meteor.call('getDoctorSchedule',doctorEid,function(err2,schedules){
              let doc_schedule = schedules;

            doc_schedule.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
            });
              
              Session.set('schedules',doc_schedule);
              $('#viewDoctorScheduleModal').modal('toggle');
              Router.go('/doctorSchedule');
            });
          }
        });//end of searchDoctor call
      },
      'click #confirmDeleteDoctorSchedule':function(event){
        event.preventDefault();
        console.log('confirmDeleteDoctorSchedule is submitted');
        let sched = DoctorSchedule.findOne({_id:Session.get('scheduleID')});
        //delete DoctorSchedule
        Meteor.call('removeDoctorSchedule',sched._id,function(err,res){
          if(err){
            Bert.alert({title: 'เกิดข้อผิดพลาด', type:'danger',style:'growl-top-right',icon: 'fa-warning'});
            return;
          }
          //delete Appointment involved
          let appnts = Appointment.find({doctor_eid:sched.eid, date:sched.date, round:parseInt(sched.time)}).fetch();
          console.log('Appointment deleted: ');
          var aCount = 0;
          for(i in appnts){
            Meteor.call('removeAppointment',appnts[i]._id, function(err,res){
              if(!err){
                console.log(appnts[i]._id);
                aCount++;
              }
              else console.log(err);
            });
          }
          Bert.alert({title:'ลบตารางออกตรวจเรียบร้อยแล้ว', message: 'มี '+aCount+' นัดหมายถูกลบ', type:'success',style:'growl-top-right',icon: 'fa-check', hideDelay:2000});
          Meteor.call('getDoctorSchedule',sched.eid,function(err,schedules){
            Session.set('schedules', schedules);
          });
        });

        
      }
  });

  Template.viewDoctorSchedule.events({
    'click #viewPatientList-Btn':function(event){
      event.preventDefault();
      console.log('clicked schedule: ' + $(event.target).data('sched'));
      Session.set('scheduleID', $(event.target).data('sched'));
    }
  });

  Template.viewDoctorSchedule.helpers({
    schedules: function(){
        console.log('schedule: ',Session.get('schedules'));
        return Session.get('schedules');
    },
  });

  Template.body.helpers({
    patients: function(){
      console.log('Attempt to find in DoctorSchedule');
      let schedule = DoctorSchedule.findOne({_id:Session.get('scheduleID')});
      console.log(schedule);
      let doc_id = schedule.eid;
      let date = schedule.date;
      let round = parseInt(schedule.time);
      //get apps with : doc_id date round
      let appsCursor = Appointment.find({doctor_eid:doc_id, date:date, round:round});
      console.log('Attempt to find in Appointment with result: ');
      console.log(appsCursor.fetch());
      let names = [];
      let i = 0;
      appsCursor.forEach(function(app){
        //find user with matching hn
        user = User.findOne({hn:app.patient_hn});
        console.log('Attempt to find in User with result: ' + user);
        if(user != null){
          names[i] = "(" + user.hn + "): " + user.fname + " " + user.lname;
          i++;
        }
        //return list of patient name
        console.log('returning patient name : ' + names);
      });
      return names;
    }
  });

  Template.viewDoctorSchedule.onRendered(function(){
    cUser = Session.get('current_user');
    if(cUser.role=='doctor'){
        Meteor.call('getDoctorSchedule',cUser.eid,function(err,res){
          if(err) console.log('cannot get doc schedule');
          else {
            let doc_schedule = res;
            doc_schedule.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.date) - new Date(a.date);
            });
            Session.set('schedules',doc_schedule);
          }
        });     
    }
  });

  Template.registerHelper('equalTo',(a,b)=>{
    return a == b;
  });  
}



