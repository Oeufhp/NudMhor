Template.body.events({
    'click #datepicker-info': function(event){
        event.preventDefault();
        $('#datepicker-register').datetimepicker({
			format:'DD/MMM/YYYY'
		});
    }
});

