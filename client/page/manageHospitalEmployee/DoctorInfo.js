Template.body.events({
    'click #searchDocName-btn':function(event){
        $('#searchDocName-modal').modal('hide');
        let doc = $('#viewDocInfo_docSel option:selected').val();
        console.log('docid: ',doc);
        Meteor.call('viewDoctorInfo_search',doc,function(err,result){
            console.log(result);
            Session.set('viewDocInfo_selDoc',result);
        });
        $('#viewDocInfoModal').modal('show');
        
    },
    'change #viewDocInfo_depSel':function(event){
        console.log('click selector');
        let depart = $('#viewDocInfo_depSel option:selected').text();
        let doctors = User.find({department:depart,role:"doctor"}).fetch();
        console.log(depart);
        $('.docList').remove();
        for(let i=0;i<doctors.length;i++){
          $('#viewDocInfo_docSel').append("<option class='docList' data-eid='"+doctors[i].eid+"' value='"+doctors[i].eid+"'>"+doctors[i].fname+" "+doctors[i].lname+"</option>")
        }
      }
});

Template.body.helpers({
    'viewDoctorInfo': function(){
        let doctor = Session.get('viewDocInfo_selDoc');
        console.log('get doctor: ',doctor);
        return doctor;

    }

});
