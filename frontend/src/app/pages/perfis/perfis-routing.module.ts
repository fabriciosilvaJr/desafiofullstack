import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilListComponent } from './perfil-list/perfil-list.component';


const routes: Routes = [

  {path: '', component: PerfilListComponent},
  {path: 'new', component: PerfilFormComponent},
  {path: ':id/edit', component: PerfilFormComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfisRoutingModule { }
