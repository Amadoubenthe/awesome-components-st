import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  delay,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  private lastCandiateLoad = 0;

  constructor(private http: HttpClient) {}

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  private setLoadingStatus(status: boolean) {
    return this._loading$.next(status);
  }

  getCandidatesFromServer() {
    if (Date.now() - this.lastCandiateLoad <= 300000) {
      return;
    }

    this.setLoadingStatus(true);
    this.http
      .get<Candidate[]>(`${environment.apiUrl}/candidates`)
      .pipe(
        delay(1000),
        tap((candidates) => {
          this.lastCandiateLoad = Date.now();
          this._candidates$.next(candidates);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  getCandidateById(id: number): Observable<Candidate> {
    if (this.lastCandiateLoad === 0) {
      this.getCandidatesFromServer();
    }
    return this.candidates$.pipe(
      map(
        (candidates) => candidates.filter((candidate) => candidate.id === id)[0]
      )
    );
  }

  deleteCandidate(id: number): void {
    this.setLoadingStatus(true);

    this.http
      .delete(`${environment.apiUrl}/candidates/${id}`)
      .pipe(
        switchMap(() => this.candidates$),
        take(1),
        map((candidates) =>
          candidates.filter((candidate) => candidate.id !== id)
        ),
        tap((candidates) => {
          this._candidates$.next(candidates);

          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }
}
