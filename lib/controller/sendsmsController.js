if(Meteor.isServer){
    Meteor.methods({
        'sendSMS':function(tel,message){
            console.log('sendSMS method has invoked');
            this.unblock();
            HTTP.call('GET', 'https://sms.gipsic.com/api/balance', {params:{
                key:'BW2v0r3UG3f93oRy879T8Lzma5kbKDvu',
                secret:'WL0m78EwxjqYae24l8Ac23am53hehDHL'
            }}, function(err, res) {
                // if(err){
                //     console.log('call error: ');
                //     console.log(err);
                //     return;
                // }
                //console.log(res);
                let retObj = JSON.parse(res.content);
                console.log('balance remains before send: '+ retObj.balance);
                if(retObj.balance >= 100){
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
                        // Got a network error, time-out or HTTP error in the 400 or 500 range.
                        return e;
                    }
                }
                else{
                    return 'balance nearly empty';
                }               
            });           

        },    
    });
}
