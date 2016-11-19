if(Meteor.isServer){
    Meteor.methods({
        'sendSMS':function(tel,message){
            this.unblock();
            var balanceObj = HTTP.call('GET', 'https://sms.gipsic.com/api/balance', {params:{
                key:'BW2v0r3UG3f93oRy879T8Lzma5kbKDvu',
                secret:'WL0m78EwxjqYae24l8Ac23am53hehDHL'
            }});
            if(balanceObj.balance >= 100){
                try{
                    var result = HTTP.call("POST",'https://sms.gipsic.com/api/send', {  params:{
                        key:'BW2v0r3UG3f93oRy879T8Lzma5kbKDvu',
                        secret:'WL0m78EwxjqYae24l8Ac23am53hehDHL',
                        phone: tel,
                        sender: 'NOTICE',
                        message: message,
                    }});
                    return result;
                }
                catch(e){
                    return e;
                }
            }
            else{
                return 'balance nearly empty';
            }
        },    
    });
}
