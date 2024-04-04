import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelassignedgroupsPage } from './levelassignedgroups.page';

const routes: Routes = [
  {
    path: '',
    component: LevelassignedgroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelassignedgroupsPageRoutingModule {}
