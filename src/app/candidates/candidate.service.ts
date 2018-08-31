import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ICandidate } from './candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private productUrl = 'api/candidates/candidate.json';

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<ICandidate[]> {
    return this.http.get<ICandidate[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCandidate(id: number): Observable<ICandidate | undefined> {
    return this.getCandidates().pipe(
      map((products: ICandidate[]) => products.find(p => p.candidateId === id))
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}