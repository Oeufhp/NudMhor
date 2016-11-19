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
        }
    });
}