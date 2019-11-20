export class Participant {
    
    events : string;
    participantName : string;
    address :string;
    email : string;
    contactNo : string;
    eventDate : Date;
    gender : string;
    newsletter : string;

    constructor(events:string="", participantName:string="", address:string ="",email:string ="",contactNo:string ="",eventDate:Date = null,gender:string="",newsletter:string=""){

        this.events = events;
        this.participantName = participantName;
        this.address = address;
        this.email = email;
        this.contactNo = contactNo;
        this.eventDate = eventDate;
        this.gender = gender;
        this.newsletter = newsletter;
    }

}
