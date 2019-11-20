import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../services/participant.service';
import { Participant } from './participant';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.css']
})
export class ParticipantDetailsComponent implements OnInit {
  participant: Participant;
  statusMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private participantService: ParticipantService, private router: Router) { }

  ngOnInit() {
    //let participantId = this.activatedRoute.snapshot.params.participantId;
    let participantId;

    this.activatedRoute.paramMap   //v+4 onwards
      .subscribe((params) => {
        participantId = params.get('participantId');

      });

    this.participantService.searchParticipant(participantId)
      .subscribe(
        (successRes: Participant) => {
          this.participant = successRes;
        },
        (errRes) => {
          this.statusMessage = "Error fetching participant";
          console.log(errRes);
        });
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }

}
