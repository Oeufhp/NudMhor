Template.body.events({
    'click #searchDocName-btn':function(event){
        $('#searchDocName-modal').modal('hide');
        let doc = $('#viewDocInfo_docSel option:selected').val();
        console.log('docid: ',doc);
        // Meteor.call('viewDoctorInfo_search',doc,function(err,result){
        //     console.log(result);
        //     Session.set('viewDocInfo_selDoc',result);
        // });
        //Session.set('viewDocInfo_selDoc',);
        $('#viewDocInfoModal').modal('show');
        
    },
    'change #viewDocInfo_depSel':function(event){
        console.log('click selector');
        let depart = $('#viewDocInfo_depSel option:selected').text();
        Session.set('viewDocInfo_selDep',depart);
      }
});

Template.body.helpers({
    'viewDoctorInfo_doctor_list': function(){
      let depart = Session.get('viewDocInfo_selDep');
      console.log('helpers',User.find({role:"doctor",department:depart}).fetch());
      return User.find({role:"doctor",department:depart}).fetch();
    }
});