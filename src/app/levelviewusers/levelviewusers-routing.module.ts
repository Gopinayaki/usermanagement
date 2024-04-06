import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelviewusersPage } from './levelviewusers.page';

const routes: Routes = [
  {
    path: '',
    component: LevelviewusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelviewusersPageRoutingModule {}
