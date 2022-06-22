
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { ContasResultado } from 'src/app/pages/contas-resultado/contasresultado.model';
import { Natureza } from 'src/app/pages/naturezas/natureza.model';
import { ContasResultadoService } from '../services/contas-resultado.service';
import { NaturezaService } from '../services/natureza.service';
import { PlanoContasService } from '../services/plano-contas.service';

@Injectable()
export class PlanoContasResolver implements Resolve<any> {
    naturezas: Natureza[] = [];
    contas_resultados: ContasResultado[] = [];
    constructor(
        private naturezaService: NaturezaService,
        private contasResultadoService: ContasResultadoService,
        private planoContasService: PlanoContasService
        ) {}


    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            
  
          return this.naturezaService.getAll().toPromise().then(res => {
        
            return  this.contasResultadoService.getAll().toPromise().then(res2 => {
                
                return  this.planoContasService.tamanho().toPromise().then(res3 => {
                    
                    return {
                        everything: {
                            naturezas: res,
                            contas: res2,
                            tamanho: res3
                        }
                        
                    }
                    
                })
             })
            });
        
              
    
    }
}
