
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Banco } from 'src/app/pages/bancos/banco.model';
import { Contato } from 'src/app/pages/contatos/contato.model';
import { Natureza } from 'src/app/pages/naturezas/natureza.model';
import { BancoService } from '../services/banco.service';
import { ContatoService } from '../services/contato.service';
import { CprCentroCustoService } from '../services/cpr-centro-custo.service';
import { MovimentoService } from '../services/movimento.service';
import { NaturezaService } from '../services/natureza.service';

@Injectable()
export class PagarReceberResolver implements Resolve<any> {

    naturezas: Natureza[] = [];
    contatos: Contato[] = [];
    bancos: Banco[] = [];
    constructor(
        private naturezaService: NaturezaService,
        private contatoService: ContatoService,
        private bancoService: BancoService,
        private movimentoService: MovimentoService,
        private cprCentroCustoService: CprCentroCustoService,

    ) { }



    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {


        return this.naturezaService.getAll().toPromise().then(res => {

            return this.contatoService.getAll().toPromise().then(res2 => {

                return this.bancoService.getAll().toPromise().then(res3 => {

                    return this.movimentoService.getAll().toPromise().then(res4 => {

                        return this.cprCentroCustoService.getAll().toPromise().then(res5 => {


                            return {
                                everything: {
                                    naturezas: res,
                                    contatos: res2,
                                    bancos: res3,
                                    movimentos: res4,
                                    cpr_centro_custos: res5
                                }

                            }
                        })

                    })
                })
            })
        });



    }
}
