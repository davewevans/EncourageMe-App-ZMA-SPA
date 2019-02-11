import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersGridComponent } from './members-grid/members-grid.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberSettingsComponent } from './member-settings/member-settings.component';

const memberRoutes: Routes = [
    { path: 'members', component: MembersGridComponent, canActivate: [AuthGuard], data: { roles: ['member', 'admin'] }  },
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
