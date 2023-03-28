import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cafe', component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dahsboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }


      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }

      }
    ]
  },
  {
    path: '**', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
