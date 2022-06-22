
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Dashboard } from 'src/app/pages/dashboard/dashboard.model';
import { DashboardService } from '../services/dashboard.service';



@Injectable()
export class DashboardResolver implements Resolve<any> {

    despesas: Dashboard[] = [];
    receitas: Dashboard[] = [];
    saldo: Dashboard[] = [];
    despesasChart: Dashboard[] = [];
    receitasChart: Dashboard[] = [];
    saldoChart: Dashboard[] = [];
    constructor(
        private dashboardService: DashboardService,


    ) { }



    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {


        return this.dashboardService.getDespesas().toPromise().then(res => {

            return this.dashboardService.getReceitas().toPromise().then(res2 => {

                return this.dashboardService.getSaldo().toPromise().then(res3 => {

                    return this.dashboardService.getQuantUsers().toPromise().then(res4 => {

                        return this.dashboardService.getQuantContatos().toPromise().then(res5 => {

                            return this.dashboardService.getQuantBancos().toPromise().then(res6 => {

                                return this.dashboardService.getCPRMonth().toPromise().then(res7 => {


                                    return {
                                        everything: {
                                            despesas: res,
                                            receitas: res2,
                                            saldo: res3,
                                            quantUsers: res4,
                                            quantContatos: res5,
                                            quantBancos: res6,
                                            cprMonth: res7
                                        }

                                    }

                                })
                            })
                        })

                    })
                })
            })
        });

    }
}
