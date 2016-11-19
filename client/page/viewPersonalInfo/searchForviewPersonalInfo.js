if(Meteor.isClient){
    Template.body.events({
        'submit #searchPatientForm':function(event){
            event.preventDefault();
            console.log('Submitted search patient id');
            let cidhn = event.target.cidhn.value.trim();
            Meteor.call('searchPatient',cidhn,function(err,user){
                if(err){
                    console.log("bert alert");
                    Bert.alert({title: 'รหัสผู้ป่วยที่ระบุไม่มีอยู่ในระบบ',
                                message: 'กรุณาระบุใหม่อีกครั้ง'
                    ,
                    type:'warning',style:'growl-top-right',icon: 'fa-warning'});       
                }
                else{
                    Session.set('patientSearched',user);
                    $('#searchHN-modal').modal('toggle');
                    Router.go('/viewPatientInfo');
                }
            });
        },
    });
}