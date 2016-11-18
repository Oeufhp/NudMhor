hn_next = function() {
  lastest_user = User.findOne({},{sort:{hn:-1}});
  let hn;
  if(lastest_user==null || lastest_user.hn == null){
    hn = "HN000000"
  }
  else{
    let number =""+(parseInt(lastest_user.hn.substr(2))+1) ;
    while(number.length<6){
      number="0"+number;
    }
    hn="HN"+number;
  }
  return hn;
 }
eid_next = function() {
   lastest_user = User.findOne({},{sort:{eid:-1}});
   let eid;
   if(lastest_user==null || lastest_user.eid == null){
     eid = "E00000"
   }
   else{
     let number =""+(parseInt(lastest_user.eid.substr(1))+1) ;
     while(number.length<5){
       number="0"+number;
     }
     eid="E"+number;
   }
   return eid;
}
Meteor.methods({
  'register': function(user){
    console.log("attempt to register with cid : "+user.cid);
    if(User.find({cid: user.cid,role:"patient"}).count()!=0){
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'already used with cid');
    }
    else if(user.cid==null || user.cid.length != 13){
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'cid must be length 13');
    }
    else{
      user.role="patient";
      user.hn=hn_next();
      User.insert(user);
    }
  },
  'loginWithCID': function(username,password){
    console.log("attempt to login with Citizen ID : "+username +" pass : "+password);
    if(User.find({cid:username,password:password}).count()==0){
      console.log("login unsuccessful");
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'Wrong citizenID or HosptitalID or Password');
    }
    else{
      console.log("login successful");
      return User.findOne({cid:username,password:password});
    }
  },
  'loginWithHN': function(username,password){
    console.log("attempt to login with HN : "+username +" pass : "+password);
    if(User.find({hn:username,password:password}).count()==0){
      console.log("login unsuccessful");
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'Wrong citizenID or HosptitalID or Password');
    }
    else{
      console.log("login successful");
      return User.findOne({hn:username,password:password});
    }
  },
  'loginWithEID': function(username,password){
    console.log("attempt to login with EID : "+username +" pass : "+password);
    if(User.find({eid:username,password:password}).count()==0){
      console.log("login unsuccessful");
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'Wrong citizenID or HosptitalID or Password');
    }
    else{
      console.log("login successful");
      return User.findOne({eid:username,password:password});
    }
  },
  'addEmployee': function(user){
    console.log("attempt to add Employee with cid : "+user.cid);
    if(User.find({cid: user.cid,role:user.role}).count()!=0){
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'already have emp with this cid');
    }
    else if(user.cid==null || user.cid.length != 13){
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'cid must be length 13');
    }
    else{
      user.eid=eid_next();
      User.insert(user);
      console.log("add employee: " + user.eid);
      return user.eid;
    }
  },
  'searchDoctor': function(eidd){
    console.log("attempt to search eid: " + eidd);
    if(User.find({eid:eidd, role:'doctor'}).count()===0){
      throw new Meteor.Error(404, 'Error 404: Not Found', 'no eid in system');
    }
    else{
      user = User.findOne({eid: eidd},{});
      return user.fname + " " + user.lname;
    }
  },
  'searchRole':function(eidd){
    console.log("attemp to search eid: "+ eidd);
    if(User.find({eid:eidd}).count()===0){
      throw new Meteor.Error(404,'Error 404: Not Found','no eid in DB');
    }
    else{
      user =User.findOne({eid:eidd},{});
      return user;
    }
  },

  'editRole':function(eidd,fname,lname,email,tel,role){
    console.log('you try to update role info eith this eid:'+eidd);
    if(User.find({eid:eidd}).count()===0){
      throw new Meteor.Error(404,'Error 404: Not Found','no eid in DB');
    }
    else{
      user=User.findOne({eid:eidd},{});
      User.update({eid:eidd},
                  {$set :{   lname: lname,
                             fname:fname,
                             email:email,
                             tel:tel,
                             role:role}});
    }
    user=User.findOne({eid:eidd},{});
    return user;
  },
  'searchPatient':function(cid_hn){
    console.log("attemp to search cid or HN: " + cid_hn);
    user = User.findOne({ role:'patient' , $or: [{cid:cid_hn}, {hn:cid_hn}]},{});
    if(user == null){
      throw new Meteor.Error(404,'Error 404: Not Found','No cid or hn in system');
    }
    else{
      return user;  
    }

  },
  'deleteRole':function(delEid){
    console.log("delete eid: "+delEid+" in Database");
    User.remove({eid:delEid},{});
  },
  'editPatientInfo':function(editedCid,fname,lname,email,tel,drugAllergy){
    console.log('attemp to update patient info of cid :'+editedCid);
    if(User.find({cid:editedCid}).count()==0){
      throw new Meteor.Error(404,'Error 404: Not Found','no cid in DB');
    }
    else{
      User.update({cid:editedCid},
                  {$set :{   lname: lname,
                             fname:fname,
                             email:email,
                             tel:tel,
                             drugAllergy:drugAllergy}});
    }
    user=User.findOne({cid:editedCid},{});
    return user;
  },
});
