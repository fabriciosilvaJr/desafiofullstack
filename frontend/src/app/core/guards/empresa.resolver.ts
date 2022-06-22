import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/pages/empresa/empresa.model';
import { EmpresaService } from '../services/empresa.service';

@Injectable()
export class EmpresaResolver implements Resolve<Empresa> {
  
    constructor(private empresaService: EmpresaService) {}
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            
          
            return   this.empresaService.getEmpresa()
    }
}
