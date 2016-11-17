if(Meteor.isClient){
    Template.RoleInfo.helpers({
            user:function(){
                return Session.get('userr');
            },
            genderMale:function(){
                return user.gender==="male"?'checked':'';
            },
            genderFemale:function(){
                return user.gender==="female"?'checked':'';
            }
    });
}
