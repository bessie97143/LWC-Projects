import { LightningElement, wire } from 'lwc';
import { MessageContext } from 'lightning/messageService';
import {publishMC, subscribeMC, unsubscribeMC} from 'c/lmsShared';

export default class LmsMarketing extends LightningElement {

    optValues=[];
    msgToPubish;
    channelType = 'Sales';
    subscribeButtonBrand = 'brand';
    subscribeButtonLabel = 'Subscribe to Channels';

    subscription = null;
    receivedMessage='';

    @wire(MessageContext) 
    messageContext;

    get options() {
        return [
            { label: 'Marketing', value: 'Marketing' },
            { label: 'Service', value: 'Service' }
        ];
    }

    get selectedChannelValues() {
        return this.optValues.join(',');
    }

    handleChange(e) {
        this.optValues = e.detail.value;
    }

    setMsg(event){
        this.msgToPubish = event.target.value;
    }

    handleSubscribe(){
        if(this.subscription){
            unsubscribeMC(this.subscription);
            this.subscription = null;
            this.subscribeButtonBrand = 'brand';
            this.subscribeButtonLabel = 'Subscribe to Channels';
            this.receivedMessage = '';
        }
        else{
            subscribeMC(this.messageContext,(subscription,message)=>{
                this.subscription = subscription;
                this.receivedMessage = (message && this.optValues.includes(message.lmsMsgType))?message.lmsData:this.receivedMessage;
            });
            this.subscribeButtonBrand = 'destructive';
            this.subscribeButtonLabel = 'Unsubscribe from Channels';
        }

    }

    handlePublish(){
        publishMC(this.messageContext, this.msgToPubish, this.channelType);
    }

}