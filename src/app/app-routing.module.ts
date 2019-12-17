import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'splashscreen', loadChildren: './splashscreen/splashscreen.module#SplashscreenPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'detailstab', loadChildren: './pages/detailstab/detailstab.module#DetailstabPageModule' },
  { path: 'dashboardchef', loadChildren: './dashboardchef/dashboardchef.module#DashboardchefPageModule' },
  { path: 'detailsprojet', loadChildren: './detailsprojet/detailsprojet.module#DetailsprojetPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
