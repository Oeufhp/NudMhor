Meteor.methods({
    'addDoctorSchedule':function(eidd,date,time){
        let schedule = {eid:eidd, date:date, time:time};
        if(DoctorSchedule.find({$and:[{eid:eidd},{date:date},{time:time}]},{}).count()!=0)
            throw new Meteor.Error(400, "duplicated data");
        else DoctorSchedule.insert(schedule);
    },
    'getDoctorSchedule':function(doctorEid){
        let cursor = DoctorSchedule.find({eid:doctorEid},{});
        return cursor.fetch();
    }
});