import { NgModule } from '@angular/core';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CandidateListComponent, SingleCandidateComponent],
  imports: [ReactiveStateRoutingModule, SharedModule],
})
export class ReactiveStateModule {}
