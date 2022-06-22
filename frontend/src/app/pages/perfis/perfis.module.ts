import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PerfisRoutingModule } from './perfis-routing.module';
import { PerfilListComponent } from './perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilFilterPipe } from './perfil-filter.pipe';
import { OrderModule } from 'ngx-order-pipe'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Importação
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [PerfilListComponent, PerfilFormComponent, PerfilFilterPipe],
  imports: [
    CommonModule,
    PerfisRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    TabViewModule,

  ]
})
export class PerfisModule { }
