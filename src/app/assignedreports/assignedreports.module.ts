import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedreportsPageRoutingModule } from './assignedreports-routing.module';

import { AssignedreportsPage } from './assignedreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedreportsPageRoutingModule
  ],
  declarations: [AssignedreportsPage]
})
export class AssignedreportsPageModule {}
