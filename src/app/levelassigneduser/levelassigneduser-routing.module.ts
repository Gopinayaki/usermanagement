import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelassigneduserPage } from './levelassigneduser.page';

const routes: Routes = [
  {
    path: '',
    component: LevelassigneduserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelassigneduserPageRoutingModule {}
