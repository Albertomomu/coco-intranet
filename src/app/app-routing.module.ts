import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./pages/inicio/inicio.module').then((m) => m.InicioPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('./pages/documents/documents.module').then(
        (m) => m.DocumentsPageModule
      ),
    /* canActivate: [AuthGuard], */
  },
  {
    path: 'satisfaction-form',
    loadChildren: () =>
      import('./pages/satisfaction-form/satisfaction-form.module').then(
        (m) => m.SatisfactionFormPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'document-viewer/:documentUrl',
    loadChildren: () =>
      import('./pages/document-viewer/document-viewer.module').then(
        (m) => m.DocumentViewerPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'satisfaction-form-success',
    loadChildren: () =>
      import(
        './pages/satisfaction-form-success/satisfaction-form-success.module'
      ).then((m) => m.SatisfactionFormSuccessPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./pages/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'initial-form',
    loadChildren: () => import('./pages/initial-form/initial-form.module').then( m => m.InitialFormPageModule)
  },
  {
    path: 'budget',
    loadChildren: () => import('./pages/budget/budget.module').then( m => m.BudgetPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'informes',
    loadChildren: () => import('./pages/informes/informes.module').then( m => m.InformesPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
