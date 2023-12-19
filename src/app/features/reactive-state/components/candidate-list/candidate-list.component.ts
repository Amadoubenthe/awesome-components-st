import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidatesService } from '../../services/candidates/candidates.service';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  links = ['jgjgjggj', 'jgjgjggj', 'jgjgjggj'];

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.initObservable();
    this.candidatesService.getCandidatesFromServer();
  }

  private initObservable() {
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = this.candidatesService.candidates$;
  }
}
