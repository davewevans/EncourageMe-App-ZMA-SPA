import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { DialogOverviewExampleDialog } from './dialog-example/dialog-example.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PrimengTestComponent } from './primeng-test/primeng-test.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    { path: 'dialogtest', component: DialogOverviewExampleDialog },
    { path: 'primeng-test', component: PrimengTestComponent },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
          ),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
