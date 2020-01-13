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
        
        { path: 'main/:id', loadChildren: '../main/main.module#MainPageModule' },
        { path: 'profile/:id', loadChildren: '../profile/profile.module#ProfilePageModule' },
        { path: 'settings/:id', loadChildren: '../settings/settings.module#SettingsPageModule' },
        { path: 'history/:id', loadChildren: '../history/history.module#HistoryPageModule' },
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
