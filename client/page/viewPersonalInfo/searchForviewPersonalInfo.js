if(Meteor.isClient){
    Template.body.events({
        // 'click #searchHN-btn':function(event){
        //     $('#searchHN-modal').modal('toggle');
        // },
        // 'submit #searchEIDForm':function(event){
        //     event.preventDefault();
        //     console.log('searhEIDForm is submitted');
        //     let RoleEid=event.target.RoleEid.value.trim();
        //     Meteor.call('searchRole',RoleEid,function(err,userr){
        //        if(err){
        //            Bert.alert({title:'รหัสพนักงานนี้ไม่มีอยู่ในระบบ กรุณาลองใหม่อีกครั้ง',
        //           type:'warning',style:'growl-top-right',icon: 'fa-warning'});
        //        }
        //        else{
        //          Session.set('userr',userr);
        //          Router.go('/RoleInfo');
        //          $('#searchEID-modal').modal('toggle');
        //        } 
        //     });
        // }
    });
    Template.body.helpers({
        user:function(){
            return Session.get('userr');
        }
    });
}