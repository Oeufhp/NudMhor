Meteor.methods({
    'addDoctorSchedule':function(eidd,date,time){
        let schedule = {eid:eidd, date:date, time:time};
        DoctorSchedule.insert(schedule);
    }
});