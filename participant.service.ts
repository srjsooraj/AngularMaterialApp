import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Participant } from '../routing/participant';

const REST_ENDPOINT = "http://localhost:8080/HttpServiceUsage/Participant/";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private httpClient: HttpClient) { }

  registerParticipant(participant: Participant): Observable<Participant> {
    //webservice call
    return this.httpClient.post<Participant>(REST_ENDPOINT, participant)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  fetchAllParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(REST_ENDPOINT)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  searchParticipant(participantId: number): Observable<Participant> {
    return this.httpClient.get<Participant>(REST_ENDPOINT + participantId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  removeParticipant(participantId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(REST_ENDPOINT + participantId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateParticipant(participantId: number, participant: Participant): Observable<Participant> {
    return this.httpClient.put<Participant>(REST_ENDPOINT + participantId, participant);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
