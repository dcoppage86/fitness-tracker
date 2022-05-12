// Core Modules
import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from './../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

// Training Components
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';

import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [SharedModule, TrainingRoutingModule, StoreModule.forFeature('training', trainingReducer)],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
