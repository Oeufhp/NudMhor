Template.editPatientInfo.onRendered(function() {
		// $('#datepicker-register').datepicker({
    	// 	format: "dd/mm/yyyy",
    	// 	weekStart: 1,
    	// 	autoclose: true,
    	// 	toggleActive: true
		// });
		$('#datepicker-register').datetimepicker({
			format:'DD/MM/YYYY'
		});
	})