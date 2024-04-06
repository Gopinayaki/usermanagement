import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelviewPage } from './levelview.page';

const routes: Routes = [
  {
    path: '',
    component: LevelviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelviewPageRoutingModule {}
