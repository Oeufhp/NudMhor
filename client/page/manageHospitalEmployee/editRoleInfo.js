if(Meteor.isClient){
    Template.editRoleInfo.events({
        'submit #roleInfoForm':function(event){
            event.preventDefault();
            console.log('roleInfoForm is submitted');
            let RoleEid=Session.get('userr').eid;
            let fname=event.target.fname.value.trim();
            let lname=event.target.lname.value.trim();
            let email=event.target.email.value.trim();
            let tel=event.target.tel.value.trim();
            let role=event.target.role.value; 
            Meteor.call('editRole',RoleEid,fname,lname,email,tel,role,function(err,usr){
                if(err){
                   Bert.alert({title:'การแก้ไขล้มเหลว อาจเป็นเพราะไม่มีบุคคลนี้ในระบบ',
                    type:'danger',style:'growl-top-right',icon: 'fa-warning'}); 
                }
                else{
                     Session.set('usr',usr);
                     $('#editRoleInfoConfirmationModal').modal({backdrop: 'static', keyboard: false}); 
                }
            });
        },
        'click #editRoleGoBack':function(event){
            event.preventDefault();
            console.log("Going back");
            $('#editRoleInfoConfirmationModal').modal('hide');
            $('#deleteRoleConfirmationModal').modal('hide');
            Router.go('/home/admin');
        },
        'click #deleteRoleBtn':function(event){
            event.preventDefault();
            console.log("deleting hospitalEmployee");
            let delEid = Session.get('userr').eid;
            Meteor.call('deleteRole', delEid);
            $('#deleteRoleModal').modal('hide');
            $('#deleteRoleConfirmationModal').modal({backdrop: 'static', keyboard: false}); 
        }
    });
    Template.editRoleInfo.helpers({
            user:function(){
                return Session.get('userr');
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
            },
            editedUser:function(){
                return Session.get('usr');
            }
    });
}
