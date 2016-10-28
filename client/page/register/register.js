Template.register.rendered=function() {
	$('#datepicker-register').datepicker().on('changeDate', function(ev){
    $(this).datepicker('hide');
  });
}
