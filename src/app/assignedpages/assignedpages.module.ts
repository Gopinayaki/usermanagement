import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedpagesPageRoutingModule } from './assignedpages-routing.module';

import { AssignedpagesPage } from './assignedpages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedpagesPageRoutingModule
  ],
  declarations: [AssignedpagesPage]
})
export class AssignedpagesPageModule {}
