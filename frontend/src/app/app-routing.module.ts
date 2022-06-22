import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticationComponent } from './core/components/layout/authentication/authentication.component';
import { HomeComponent } from './core/components/layout/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';



const routes: Routes = [
  {
    path:'' , 
    component: HomeComponent,
    children: [
      {path: 'usuarios',  loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule)},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
      canActivate: [AuthGuard]
  }, 
  {
    path:'',
    component: AuthenticationComponent,
    children: [
      {path:'',redirectTo: 'login', pathMatch:'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]

  }
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
