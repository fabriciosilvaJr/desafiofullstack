import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { ContasResultado } from 'src/app/pages/contas-resultado/contasresultado.model';
import { ContasResultadoService } from '../services/contas-resultado.service';



@Injectable()
export class ContasResultadoResolver implements Resolve<ContasResultado> {
    constructor(private contasResultadoService: ContasResultadoService) {}
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            
            return  this.contasResultadoService.getAll()
    }
}
