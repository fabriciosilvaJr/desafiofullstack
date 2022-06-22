import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Natureza } from 'src/app/pages/naturezas/natureza.model';
import { NaturezaService } from '../services/natureza.service';

@Injectable()
export class NaturezaResolver implements Resolve<Natureza> {
  
    constructor(private naturezaService: NaturezaService) {}
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            
          
            return   this.naturezaService.getAll()
    }
}
