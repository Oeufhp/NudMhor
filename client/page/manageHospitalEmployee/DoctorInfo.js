Template.body.events({
    'submit #viewDoctorInfoForm':function(event){
        event.preventDefault();
        if(event.target.department.value=="notChooseDepartment"){
          Bert.alert({title:"โปรดระบุแผนก",type:"danger",style: 'growl-top-right'})
          return;
        }
        let doctor_eid = $(event.target.doctor).find('option:selected').data('eid');
        if(doctor_eid=="noDoctorSpecific"){
            Bert.alert({title:"โปรดระบุแพทย์ที่ท่านต้องการ",type:"danger",style: 'growl-top-right'})
            return;
        }
        let doctor = User.findOne({eid:doctor_eid});
        $('#viewDocInfoModal #doctorName').text(doctor.fname+" "+doctor.lname);
        $('#viewDocInfoModal #doctorDepartment').text(doctor.department);
        $('#viewDocInfoModal #doctorSpecialize').text(doctor.specialize);
        $('#searchDocName-modal').modal('hide');
        $('#viewDocInfoModal').modal('show');
    },
    'change #departmentSelector2':function(event){
      let depart = event.target.value;
      let doctors = User.find({department:depart,role:"doctor"}).fetch();
      $('.docList').hide();
      $('.docList').remove();
      for(let i=0;i<doctors.length;i++){
        $('#doctorSelector2').append("<option class='docList' data-eid='"+doctors[i].eid+"'>"+doctors[i].fname+" "+doctors[i].lname+"</option>")
      }
    }
});
