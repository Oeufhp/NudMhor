Template.forgetPassword.rendered=function() {
	$('#datepicker-forgetpass').datepicker().on('changeDate', function(ev){
    $(this).datepicker('hide');
  });
  $('#forgetpass-next-btn').click(function(event){
    event.preventDefault();
    Router.go('/forgetPassword/resetPassword');
  });
}
// Template.body.events({
//   'click #forgetpass-next-btn' : function(event){
//     event.preventDefault();
//     Router.go('/forgetPassword/resetPassword');
//   }
// });