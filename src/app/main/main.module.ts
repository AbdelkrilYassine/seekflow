import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MainPage,
    children: [

        { path: 'tab1', loadChildren: '../pages/tab1/tab1.module#Tab1PageModule' },
        { path: 'tab2', loadChildren: '../pages/tab2/tab2.module#Tab2PageModule' },
        { path: 'tab3', loadChildren: '../pages/tab3/tab3.module#Tab3PageModule' },
    ]

    },
    {
        path: '',
        redirectTo: 'tabs/tab1',
        pathMatch:'full'
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
