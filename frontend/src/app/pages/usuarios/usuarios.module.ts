import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { OrderModule } from 'ngx-order-pipe'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Importação
import { UsuarioFilterPipe } from './usuario-filter.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [UsuarioListComponent, UsuarioFormComponent, UsuarioFilterPipe],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    ConfirmDialogModule
  ]
})
export class UsuariosModule { }
