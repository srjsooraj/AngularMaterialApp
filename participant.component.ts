import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ParticipantService } from '../services/participant.service';
import { Participant } from './participant';


export function eventDateValidatorFn(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  if (new Date(control.value) < new Date()) {
    return { "futuredate": true };
  }
}

export function checkEventStartDateandEnddateFn(fg: FormGroup): ValidationErrors | null {
  const startdate = fg.get('eventDate');
  const enddate = fg.get('enddate');

  if (!startdate.value || !enddate.value) {
    return null;
  }
  if (new Date(startdate.value) > new Date(enddate.value)) {
    return { "dateMismatch": true };
  }
}

@Component({
  selector: 'app-eventform',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  eventForm: FormGroup;
  availableEvents: string[];
  participant: Participant;
  statusMessage: string;

  constructor(private fb: FormBuilder, private participantService: ParticipantService) {    //dependency injection
    this.availableEvents = ['Event1', 'Event2', 'Event3'];
    this.participant = new Participant();
  }

  ngOnInit() {
    this.eventForm = this.fb.group({
      'events': ['', Validators.required],
      'participantName': ['', Validators.required],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])],
      'email': ['', Validators.required],
      'contactNo': ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      'eventDate': ['', Validators.compose([Validators.required, eventDateValidatorFn])],
      'enddate': ['', Validators.compose([Validators.required, eventDateValidatorFn])],
      'gender': [],
      'newsletter': []
    });

  }

  getModelObject(): Participant {
    this.participant.events = this.eventForm.value.events;
    this.participant.participantName = this.eventForm.value.participantName;
    this.participant.address = this.eventForm.value.address;
    this.participant.email = this.eventForm.value.email;
    this.participant.contactNo = this.eventForm.value.contactNo;
    this.participant.eventDate = this.eventForm.value.eventDate;
    this.participant.gender = this.eventForm.value.gender;
    this.participant.newsletter = this.eventForm.value.newsletter;
    return this.participant;
  }

  registerParticipant(): void {
    console.log(this, this.eventForm.value);
    this.participantService.registerParticipant(this.getModelObject())
      .subscribe(
        (successRep) => {
          this.statusMessage = "Participant registgered!"
        },
        (errorResp) => {
          this.statusMessage = "Error while registration";
        }
      );
  }

}


