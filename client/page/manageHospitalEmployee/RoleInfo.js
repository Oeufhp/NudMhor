if(Meteor.isClient){
    Template.RoleInfo.helpers({
            user:function(){
                return Session.get('userr');
            },
            genderMale:function(){
                return Session.get('userr').gender==="male"?'checked':'disabled';
            },
            genderFemale:function(){
                return Session.get('userr').gender==="female"?'checked':'disabled';
            },
            roleAdmin:function(){
                return Session.get('userr').role==="admin"?'selected':'';
            },
            roleDoctor:function(){
                return Session.get('userr').role==="doctor"?'selected':'';
            },
            roleNurse:function(){
                return Session.get('userr').role==="nurse"?'selected':'';
            },
            rolePharmacist:function(){
                return Session.get('userr').role==="pharmacist"?'selected':'';
            },
            roleReceptionist:function(){
                return Session.get('userr').role==="receptionist"?'selected':'';
            }
    });
}
