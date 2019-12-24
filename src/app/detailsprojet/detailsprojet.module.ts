import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsprojetPage } from './detailsprojet.page';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";


const routes: Routes = [
  {
    path: '',
    component: DetailsprojetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
        RouterModule.forChild(routes), NgxDatatableModule
  ],
  declarations: [DetailsprojetPage]
})
export class DetailsprojetPageModule {}
