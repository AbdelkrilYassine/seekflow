import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [

  {
    path: 'menupage',
    component: MenuPage,
    children: [
        
        { path: 'main', loadChildren: '../main/main.module#MainPageModule' },
        { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
        { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
        { path: 'history', loadChildren: '../history/history.module#HistoryPageModule' },
    ]

    },
        {
        path: '',
        redirectTo: 'menupage/main',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
