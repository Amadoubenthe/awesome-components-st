import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../../models/candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _candidates = new BehaviorSubject<Candidate[]>([]);

  constructor() {}

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get candidates$(): Observable<Candidate[]> {
    return this._candidates.asObservable();
  }

  private setLoadingStatus(status: boolean) {
    return this._loading$.next(status);
  }
}
