import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevelviewPageRoutingModule } from './levelview-routing.module';

import { LevelviewPage } from './levelview.page';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelviewPageRoutingModule,
    DxDataGridModule
  ],
  declarations: [LevelviewPage]
})
export class LevelviewPageModule {}
