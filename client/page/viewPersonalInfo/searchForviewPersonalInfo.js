if(Meteor.isClient){
    Template.body.events({
        'submit #searchPatientForm':function(event){
            event.preventDefault();
            console.log('Submitted search patient id');
            let cidhn = event.target.cidhn.value.trim();
            Meteor.call('searchPatient',cidhn,function(err,user){
                if(err){
                    console.log("bert alert");
                    Bert.alert({title: 'รหัสผู้ป่วยที่ระบุไม่มีอยู่ในระบบ กรุณาระบุใหม่อีกครั้ง'
                    , type: 'danger',style:'growl-top-right',icon: 'fa-key'});        
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