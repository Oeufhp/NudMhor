if (Meteor.isClient) {
  Template.loginPage.onRendered(function(){
    let margintop = ($(window).height()-500)/2;
    let str;
    if(margintop<=0){
      str = "10px";
    }
    else{
      str = margintop+"px";
    }
    $('.login-box').css('margin-top', margintop);
    $('#forgetpass-btn').click(function(event){
      event.preventDefault();
      Router.go('/forgetPassword');
    });
  });
  Template.loginPage.onRendered(function(){
    if(Session.get('current_user')!=null){
      Router.go('/home/homepage');
    }
    $('#quickLoginModal').on('show.bs.modal', function () {
        $('#quickLoginModal .modal .modal-body').css('overflow-y', 'auto');
        $('#quickLoginModal .modal .modal-body').css('max-height', $(window).height() * 0.7);
    });
  });
  Template.loginPage.events({
    'submit form': function(event) {
        event.preventDefault();
        console.log("login form is submitted.");
        let username = event.target.loginCID.value.trim().toUpperCase();
        let pass = event.target.loginPassword.value.trim();
        Meteor.call('login',username,pass,function(err,result){
          if(err!=null){
            if(err.error=="notFoundPatient"){
                Bert.alert({title:"รหัสบัตรประชาชนนี้ยังไม่มีข้อมูลผู้ป่วย",type:"danger",style: 'growl-top-right'});
            }
            else{
                Bert.alert({title:"Wrong username/password ",type:"danger",style: 'growl-top-right'});
            }
          }
          else{
            Session.setAuth('current_user', result);
            Router.go('/home/homepage');
            Bert.alert({title:"ยินดีต้อนรับ คุณ "+result.fname,type:"success",style: 'growl-top-right'})
          }
        });
    },
    // 'click #sendSMS':function(event){
    //   event.preventDefault();
    //   console.log('pressed SMS SEND!');
    //   Meteor.call('sendSMS','0847275986',function(err,res){
    //     if(err){
    //       console.log('error');
    //     }
    //     else{
    //       console.log(res);
    //     }
    //   });
    // }
  });
  Template.body.events({
    'click .dumpNewUser':function(event){
      if(User.findOne({cid:'0000000000000'})==null){
        let usr = {
          cid:'0000000000000',password:'000000',email:'patient@gmail.com',
          fname:'MRpatient',lname:'patient',tel:'0000000000',
          gender:'male',birthdate:'20/11/2016',drugAllergy: 'no'
        }
        Meteor.call('register',usr);
      }
      if(User.findOne({cid:'0000000000001'})==null){
        let usr = {
          cid:'0000000000001',password:'000000',email:'admin@gmail.com',
          fname:'MRadmin',lname:'admin',tel:'0000000000',
          gender:'male',birthdate:'20/11/2016',role:'admin'
        }
        Meteor.call('addEmployee',usr);
      }
      if(User.findOne({cid:'0000000000002'})==null){
        let usr = {
          cid:'0000000000002',password:'000000',email:'doctor@gmail.com',
          fname:'MRdoctor',lname:'doctor',tel:'0000000000',
          gender:'male',birthdate:'20/11/2016',
          department:'แผนกโรคทั่วไป',specialize:'ไม่มี',role:'doctor'
        }
        Meteor.call('addEmployee',usr);
      }
      if(User.findOne({cid:'0000000000003'})==null){
        let usr = {
          cid:'0000000000003',password:'000000',email:'nurse@gmail.com',
          fname:'MRnurse',lname:'nurse',tel:'0000000000',
          gender:'male',birthdate:'20/11/2016',role:'nurse'
        }
        Meteor.call('addEmployee',usr);
      }
      if(User.findOne({cid:'0000000000004'})==null){
        let usr = {
          cid:'0000000000004',password:'000000',email:'phamacist@gmail.com',
          fname:'MRphamacist',lname:'phamacist',tel:'0000000000',
          gender:'male',birthdate:'20/11/2016',role:'pharmacist'
        }
        Meteor.call('addEmployee',usr);
      }
      if(User.findOne({cid:'0000000000005'})==null){
        let usr = {
          cid:'0000000000005',password:'000000',email:'receptionist@gmail.com',
          fname:'MRreceptionist',lname:'receptionist',tel:'0000000000',
          gender:'male',birthdate:'20/11/2016',role:'receptionist'
        }
        Meteor.call('addEmployee',usr);
      }
      Bert.alert({title:"dump all user type success ",type:"success",style: 'growl-top-right'});
    }
  });
  Template.body.events({
    'click .loginQuickBtn':function(event){
      console.log(event.target.id)
      let usr = User.findOne(event.target.id);
      if(usr.role=="patient"){
        $('#inputEmail').val(usr.hn);
        $('#inputPassword').val(usr.password);
      }
      else{
        $('#inputEmail').val(usr.eid);
        $('#inputPassword').val(usr.password);
      }
    }
  })
}
