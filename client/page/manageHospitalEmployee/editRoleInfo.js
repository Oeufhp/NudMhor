if(Meteor.isClient){
    Template.editRoleInfo.helpers({
            user:function(){
                return Session.get('userr');
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
    Template.body.events({
        'submit #roleInfoForm':function(event){
            event.preventDefault();
            console.log('roleInfoForm is submitted');
            let RoleEid=user.eid;
            let fname=event.target.fname.value.trim();
            let lname=event.target.lname.value.trim();
            let email=event.target.email.value.trim();
            let tel=event.target.tel.value.trim();
            let role=event.target.fname.value; 
            Meteor.call('editRole',RoleEid,fname,lname,email,tel,role,function(err,usr){
                if(err){
                   Bert.alert({title:'การแก้ไขล้มเหลว อาจเป็นเพราะไม่มีบุคคลนี้ในระบบ',
                    type:'danger',style:'growl-top-right',icon: 'fa-warning'}); 
                }
                else{
                     Session.set('usr',usr);   
                }
            });
        }
    });
}
