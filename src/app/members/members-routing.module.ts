import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberSettingsComponent } from './member-settings/member-settings.component';
import { DirectoryComponent } from './directory/directory.component';
import { MemberDirectoryComponent } from './member-directory/member-directory.component';

const memberRoutes: Routes = [
    { path: 'directory', component: DirectoryComponent,
        canActivate: [AuthGuard], data: { roles: ['member'] } },
    { path: 'directory/:index', component: DirectoryComponent,
        canActivate: [AuthGuard], data: { roles: ['member'] } },
    { path: 'member-directory', component: MemberDirectoryComponent,
        canActivate: [AuthGuard], data: { roles: ['member'] } },
    { path: 'member-profile', component: MemberProfileComponent, canActivate: [AuthGuard], data: { roles: ['member'] }  },
    { path: 'member-settings', component: MemberSettingsComponent, canActivate: [AuthGuard], data: { roles: ['member'] }  },
];

@NgModule({
    imports: [
        RouterModule.forChild(memberRoutes)
    ],
    exports: [RouterModule]
})
export class MembersRoutingModule {

}
