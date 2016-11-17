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
            },
            roleAdmin:function(){
                return user.role==="admin"?'selected':'';
            },
            roleDoctor:function(){
                return user.role==="doctor"?'selected':'';
            },
            roleNurse:function(){
                return user.role==="nurse"?'selected':'';
            },
            rolePharmacist:function(){
                return user.role==="pharmacist"?'selected':'';
            },
            roleReceptionist:function(){
                return user.role==="admin"?'selected':'';
            }
    });
}
