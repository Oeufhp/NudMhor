if(Meteor.isClient){
    Template.RoleInfo.helpers({
            user:function(){
                return Session.get('userr');
            },
            // genderMale:function(){
            //     return Session.get('userr').gender==="male"?'checked':'disabled';
            // },
            // genderFemale:function(){
            //     return Session.get('userr').gender==="female"?'checked':'disabled';
            // },
            // roleAdmin:function(){
            //     return Session.get('userr').role==="admin"?'selected':'';
            // },
            // roleDoctor:function(){
            //     return Session.get('userr').role==="doctor"?'selected':'';
            // },
            // roleNurse:function(){
            //     return Session.get('userr').role==="nurse"?'selected':'';
            // },
            // rolePharmacist:function(){
            //     return Session.get('userr').role==="pharmacist"?'selected':'';
            // },
            // roleReceptionist:function(){
            //     return Session.get('userr').role==="receptionist"?'selected':'';
            // },
            genderRole:function(){
                return Session.get('userr').gender==="male"?'ชาย':'หญิง';
            },
            Role:function(){
                if(Session.get('userr').role==="admin") return 'ผู้ดูและระบบ';
                if(Session.get('userr').role==="doctor") return 'แพทย์';
                if(Session.get('userr').role==="nurse") return 'พยาบาล';
                if(Session.get('userr').role==="receptionist") return 'เจ้าหน้าที่โรงพยาบาล';
                if(Session.get('userr').role==="pharmacist") return 'เภสัชกร';
            }
    });
}
