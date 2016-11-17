Template.body.events({
    'submit #viewAppointmentForm': function(event){
        event.preventDefault();
        $('#viewAppointmentModal').modal('toggle');
        $('#viewAppointment2Modal').modal({backdrop: 'static', keyboard: false});
    },
    'click #appt-search-btn': function(event){
        event.preventDefault();
        Router.go('/viewAppointment/results');
        $('#viewAppointmentModal').modal('toggle');
    },
    'click #del-appt-btn' : function(event){
        event.preventDefault();
        $('#viewAppointmentModal3').modal('toggle');
        $('#viewAppointmentModal2').modal('toggle');
    },
    'click #changeDateTime-btn':function(event){
        event.preventDefault();
        $('#viewAppointmentModal2').modal('toggle');
        $('#viewAppointmentModal4').modal('toggle');
    },
    'submit #editAppointmentForm1':function(event){
      event.preventDefault();
      let id = Session.get('currentAppointmentID');
      let date =$(event.target.date).find('option:selected').data('date');
      console.log(date);
      let round =$(event.target.date).find('option:selected').data('time');
      Meteor.call('updateAppointment',id,date,round,function(err,result){
        if(err!=null){
          Bert.alert({title:"นัดหมายซ้ำซ้อน โปรดเลือกวันเวลาใหม่",type:"danger",style: 'growl-top-right'});
        }
        else{
          Bert.alert({title:"แก้ไขนัดการนัดหมายเรียบร้อย",type:"success",style: 'growl-top-right'});
          $('#viewAppointmentModal4').modal('toggle');
        }
      });
    },
    'click #confirm-del-btn':function(event){
      event.preventDefault();
      Meteor.call('removeAppointment',Session.get('currentAppointmentID'),function(err,result){
        if(err!=null){

        }
        else{
          Bert.alert({title:"ยกเลิกการนัดหมายเรียบร้อย",type:"success",style: 'growl-top-right'})
        }
      });
      $('#viewAppointmentModal3').modal('toggle');
    }
});
