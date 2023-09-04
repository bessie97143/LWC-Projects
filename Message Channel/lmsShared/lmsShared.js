import { APPLICATION_SCOPE, subscribe, unsubscribe, publish } from 'lightning/messageService';
import LWCMC from '@salesforce/messageChannel/LWCMessageChannel__c';

const publishMC=(messageContext, lmsMsg, lmsChannelType)=>{
    const message = {
        lmsData: lmsMsg,
        lmsMsgType: lmsChannelType
    }
    publish(messageContext, LWCMC, message);
}

const subscribeMC = (messageContext,callbk)=>{
    const subscription = subscribe( messageContext,
                                    LWCMC,
                                    (message)=>callbk(subscription,message),
                                    { scope: APPLICATION_SCOPE }
                                    );
    
}

const unsubscribeMC = (subscription)=>{
    unsubscribe(subscription);
}

export {publishMC, subscribeMC, unsubscribeMC};