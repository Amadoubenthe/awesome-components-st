import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { CandidatesService } from '../../services/candidates/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { SearchTypeOption } from '../../models/search-typeOption.model';
import { CandidateSearchType } from 'src/app/shared/enums/candidate-search-type.enum';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: SearchTypeOption[];

  constructor(
    private candidatesService: CandidatesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservable();
    this.candidatesService.getCandidatesFromServer();
  }

  private initObservable() {
    this.loading$ = this.candidatesService.loading$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value: string) => value.toLowerCase())
    );
    const searchType$ = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );

    this.candidates$ = this.candidatesService.candidates$;
  }

  private initForm(): void {
    this.searchCtrl = this.fb.control('');
    this.searchTypeCtrl = this.fb.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      {
        value: CandidateSearchType.LASTNAME,
        label: 'Nom',
      },
      {
        value: CandidateSearchType.FIRSTNAME,
        label: 'Prenom',
      },
      {
        value: CandidateSearchType.COMPANY,
        label: 'Entreprise',
      },
    ];
  }
}
