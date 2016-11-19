Template.body.events({
    'click #searchDocName-btn':function(event){
        $('#searchDocName-modal').modal('hide');
        $('#viewDocInfoModal').modal('show');
        
    }
});