if(Meteor.isClient){
    Template.body.events({
        'click #searchEID-btn': function(event){
            // event.preventDefault();
        },
        'submit #searchEIDForm':function(event){
            event.preventDefault();
            console.log('searhEIDForm is submitted');
            let RoleEid=event.target.RoleEid.value.trim();
            Meteor.call('searchRole',RoleEid,function(err,userr){
                if(err){
                    Bert.alert({title:'รหัสพนักงานนี้ไม่มีอยู่ในระบบ กรุณาลองใหม่อีกครั้ง',
                    type:'warning',style:'growl-top-right',icon: 'fa-warning'});
                }
                else{
                    Session.set('userr',userr);
                    $('#searchEID-modal').modal('toggle');
                    Router.go('/RoleInfo');
                } 
            });
         }
    });
}

