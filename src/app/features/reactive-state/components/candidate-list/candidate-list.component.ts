import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidatesService } from '../../services/candidates/candidates.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  loading$!: Observable<boolean>;
  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.loading$ = this.candidatesService.loading$;
  }
}
