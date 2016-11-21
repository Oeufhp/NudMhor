if(Meteor.isClient){
    Template.PrescriptionAppointmentList.events({
        'click #view-appt-btn': function(event){
            event.preventDefault();
            console.log('click viewappointment:'+$(event.target).data('app'));
            Session.set('currentAppointmentID',$(event.target).data('app'));
        }
    });
    Template.PrescriptionAppointmentList.helpers({
        'appointments':function(){
            let appts = Session.get('appointments');
            return Session.get('appointments');
        },
        'round':function(){
            return Session.get('appointments').round===1?"เช้า":"บ่าย";
        },
        'doctorName':function(){
            let appts=Session.get('appointments');
            let docEid=appts.doctor_eid;
            return User.findOne({eid:docEid});
        }
    });
    Template.body.events({
    //     'submit #recordPrescriptionConfirmForm': function(event){
    //   event.preventDefault();
    //   console.log('recPresCon is submited');
    //   let medicineList =event.target.medicineList.value.trim();
    //   console.log(medicineList);
    //   Session.set('medicine',medicineList);
    //   Session.set('apptID',Session.get('currentAppointmentID'));
    //   $('#recordPrescriptionModal').modal('toggle');
    //   $('#recordPrescriptionResultModal').modal({backdrop: 'static', keyboard: false});
    // },
    });
}