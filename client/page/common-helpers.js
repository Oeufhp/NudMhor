time_format = function(time){
  if(time==0){
    return "ช่วงเช้า (8.00 - 12.00น.)";
  }
  if(time==1){
    return "ช่วงบ่าย (13.00 - 16.00น.)";
  }
}
date_format = function(date){
  return moment(date).format('DD MMM YYYY');
}
Template.registerHelper('equalTo',(a,b)=>{
  return a == b;
});
Template.registerHelper('current_user',function(){
  return Session.get('current_user');
});
Template.registerHelper('isEqual',function(obj1,obj2){
  return (obj1==obj2);
});
Template.registerHelper('getEmployeeName',function(eid){
  let usr = User.findOne({eid:eid});
  if(usr!=null){
    return usr.fname +" "+usr.lname;
  }
});
Template.registerHelper('date_format',function(date){
  return moment(date).format('DD MMM YYYY');
});
Template.registerHelper('time_format',function(time){
  return time_format(time);
});
Template.registerHelper('get_session',function(key){
  return Session.get(key);
});
Template.registerHelper('appointmentList',function(){
    let patient_hn = Session.get('currentPatientHN');
    let appt_list = Appointment.find({patient_hn:patient_hn}).fetch();
    return appt_list;
});
Template.registerHelper('alluser',function(){
    return User.find().fetch();
});
Template.registerHelper('isNull',(obj)=>{
  return obj==null;
});
Template.registerHelper('isNotNull',(obj)=>{
  return obj!=null;
});
