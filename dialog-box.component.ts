import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ParticipantService } from '../services/participant.service';
import { Participant } from './participant';


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
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  eventForm : FormGroup;
  availableEvents : string[];
  participant :  Participant; 
  statusMessage :string;
  action : string;

  constructor(private fb : FormBuilder,
              private participantService : ParticipantService, 
              public dialogRef:MatDialogRef<DialogBoxComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) {

        this.availableEvents = ['Event1', 'Event2', 'Event3'];
        this.participant = new Participant();
        this.action = data.action;
  } 

  ngOnInit() {
    console.log(JSON.stringify(this.data.formData));
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

    if(this.action == 'Edit') {
      this.eventForm.patchValue({
        'events' : this.data.formdata.events,
        'participantName'  : this.data.formdata.participantName,
        'address' : this.data.formdata.address,
        'email' : this.data.formdata.email,
        'contactNo': this.data.formdata.contactNo,
        'eventDate'  : new Date(this.data.formdata.eventDate),
        'gender' : this.data.formdata.gender,
        'newsletter' :this.data.formdata.newsletter
      })

    }
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

  


  doAction(){
    if(this.action == 'Add') {
    this.participantService.registerParticipant(this.getModelObject())
    .subscribe(
      (successRep)=>{
        this.dialogRef.close({event:'Add',data:this.participant});
      },
      (errorResp)=>{
        this.statusMessage = "Error while registration";
      });    
    }
    else if(this.action == 'Edit') {
          this.participantService.updateParticipant(1, this.getModelObject())
                .subscribe((successRep)=>{
                  this.dialogRef.close({event:'Edit',data:this.participant});
                },(errorResp)=>{
                  this.statusMessage = "Error while updating record";
                })
    }

  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}