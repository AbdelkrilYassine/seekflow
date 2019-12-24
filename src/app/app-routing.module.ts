import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'splashscreen', loadChildren: './splashscreen/splashscreen.module#SplashscreenPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'detailstab', loadChildren: './pages/detailstab/detailstab.module#DetailstabPageModule' },
  { path: 'dashboardchef', loadChildren: './dashboardchef/dashboardchef.module#DashboardchefPageModule' },
  { path: 'detailsprojet/:id', loadChildren: './detailsprojet/detailsprojet.module#DetailsprojetPageModule' },
  { path: 'notfication', loadChildren: './pages/notfication/notfication.module#NotficationPageModule' },
  { path: 'welcome', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'user-list', loadChildren: './pages/user-list/user-list.module#UserListPageModule' },
  { path: 'user', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'user/:id', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
