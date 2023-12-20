import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidates/candidates.service';
import { Observable, switchMap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
})
export class SingleCandidateComponent {
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(
    private candidatesService: CandidatesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initObservable();
  }

  initObservable(): void {
    this.loading$ = this.candidatesService.loading$;

    this.candidate$ = this.route.params.pipe(
      switchMap((params) =>
        this.candidatesService.getCandidateById(+params['id'])
      )
    );
  }

  onHire() {
    throw new Error('Method not implemented.');
  }

  onRefuse() {
    throw new Error('Method not implemented.');
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }
}
