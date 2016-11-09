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
Meteor.methods({
  'register': function(user){
    console.log("attempt to register with cid : "+user.cid);
    if(User.find({cid: user.cid}).count()!=0){
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
  'login': function(username,password){
    console.log("attempt to login with username : "+username +" pass : "+password);
    if(User.find({cid:username,password:password}).count()==0){
      console.log("login unsuccessful");
      throw new Meteor.Error(400, 'Error 400: Wrong Request', 'Wrong citizenID or HosptitalID or Password');
    }
    else{
      return User.findOne({cid:username,password:password});
      console.log("login successful");
    }
  }
});
