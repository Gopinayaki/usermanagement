import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsermanagementcompComponent } from './usermanagementcomp/usermanagementcomp.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    loadChildren: () => import('./main-page/main-page.module').then( m => m.MainPagePageModule)
  },
  {
    path: 'devexpress',
    loadChildren: () => import('./devexpress/devexpress.module').then( m => m.DevexpressPageModule)
  },
  // {
  //   path: 'usermanagement',
  //   loadChildren: () => import('./usermanagement/usermanagement.module').then( m => m.UsermanagementPageModule)
  // },
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
