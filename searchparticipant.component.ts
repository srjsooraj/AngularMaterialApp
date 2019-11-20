import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Participant } from './participant';
import { ParticipantService } from '../services/participant.service';


export function eventDateValidatorFn(control : AbstractControl) : ValidationErrors | null {
  if(!control.value) return null;
  if(new Date(control.value) < new Date()) {
    return {"futuredate" : true};
  }
}

export function checkEventStartDateandEnddateFn(fg : FormGroup) : ValidationErrors | null {
    const startdate = fg.get('eventDate');
    const enddate = fg.get('enddate');

    if(!startdate.value || !enddate.value) {
      return null;
    }
    if(new Date(startdate.value) > new Date(enddate.value)) {
      return {"dateMismatch" : true};
    }
}

@Component({
  selector: 'app-searchparticipant',
  templateUrl: './searchparticipant.component.html',
  styleUrls: ['./searchparticipant.component.css']
})
export class SearchparticipantComponent implements OnInit {

  eventForm : FormGroup;
  availableEvents : string[];
  participant :  Participant; 
  statusMessage : string;
  participantId : number;

  constructor(private fb : FormBuilder,private participantService : ParticipantService) {    //dependency injection
        this.availableEvents = ['Event1', 'Event2', 'Event3'];
        this.participant = new Participant();
  } 

  ngOnInit() {
    this.eventForm = this.fb.group({
      'events' : ['',Validators.required],
      'participantName' : ['', Validators.required],
      'address' : ['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(100)])],
      'email' : ['',Validators.required],
      'contactNo' : ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{10}$')])],
      'eventDate' : ['',Validators.compose([Validators.required, eventDateValidatorFn])],
      'enddate' : ['',Validators.compose([Validators.required, eventDateValidatorFn])],
      'gender' : [],
      'newsletter' :[]
    });

  }

  searchParticipant(): void {
      this.participantService.searchParticipant(this.participantId)
          .subscribe(
            (successResp)=>{
              this.participant = successResp;
              this.eventForm.patchValue({
                'events' : this.participant.events,
                'participantName'  : this.participant.participantName,
                'address' : this.participant.address,
                'email' : this.participant.email,
                'contactNo': this.participant.contactNo,
                'eventDate'  : new Date(this.participant.eventDate),
                'gender' : this.participant.gender,
                'newsletter' : this.participant.newsletter
              })
            },
            (errorResp)=>{
              this.statusMessage = "Error while loading participant records";
            });
  }


  deleteParticipant() : void { 
    this.participantService.removeParticipant(this.participantId)
            .subscribe((successResp)=>{
                this.statusMessage = "participant record deleted";
            },(errorResp)=>{
              this.statusMessage = "Error  while deleting partiicpant record";
            })
  }

  getModelObject() : Participant {
    this.participant.events = this.eventForm.value.events;   
    this.participant.participantName = this.eventForm.value.participantName;
    this.participant.address = this.eventForm.value.address;
    this.participant.email = this.eventForm.value.email;
    this.participant.contactNo  = this.eventForm.value.contactNo;
    this.participant.eventDate = this.eventForm.value.eventDate;
    this.participant.gender = this.eventForm.value.gender;
    this.participant.newsletter = this.eventForm.value.newsletter;
    return this.participant;
  }

  updateParticipant() : void {
          this.participantService.updateParticipant(this.participantId, this.getModelObject())
              .subscribe((successRep)=>{
                this.statusMessage = "partiipant record updted";
              }, (errorResp)=>{
                  this.statusMessage= "Error while updation";
              })
  }
}
