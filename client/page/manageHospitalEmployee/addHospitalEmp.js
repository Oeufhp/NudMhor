Template.body.events({
  'submit #addEmployeeForm': function(event){
    event.preventDefault();
    console.log('addEmployeeForm is submited');
    $('#addEmployeeModal').modal('hide');
    $('#addEmployeeModal2').modal({backdrop: 'static', keyboard: false});
  },
});
Template.body.rendered(function(){
  $('#datepicker-addemployee').datepicker().on('changeDate', function(ev){
    $(this).datepicker('hide');
  });
})
