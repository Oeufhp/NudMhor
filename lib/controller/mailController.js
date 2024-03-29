if(Meteor.isServer){
  Meteor.methods({
    'sendEmail': function (to, from, subject, text) {
      check([to, from, subject, text], [String]);
      Email.send({
        to: to,
        from: from,
        subject: subject,
        html: text
      });
    }
  });
}
