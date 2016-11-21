import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
  Meteor.startup(() => {
    process.env.MAIL_URL = "smtp://lostunevol:shadowfiend38@smtp.gmail.com:465";
  });
}
