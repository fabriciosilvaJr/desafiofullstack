
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Perfil } from '../../pages/perfis/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  GUID = window.localStorage.getItem('guid')

  private api: string = (environment.api + "perfis" ); 

  constructor(private http: HttpClient) { }
  getAll(): Observable<Perfil[] >{

    return this.http.get(`${this.api}`).pipe(
      catchError(this.handleError),
      map (this.jsonDataToPerfils)
    )

  }

  getById(CODIGO: number): Observable<Perfil>{
    const url = `${this.api}/${CODIGO}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToPerfil)
    )

  }

  create(perfil: Perfil): Observable<Perfil>{
    return this.http.post(this.api, perfil).pipe(
      catchError(this.handleError),

    )
  }

  update(perfil: Perfil){
    const url = `${this.api}`;
    return this.http.patch(url, perfil).pipe(
      map(() => perfil),
      catchError(this.handleError)
    )
  } 
  


  delete(CODIGO: number): Observable<any>{
  
    const url = `${this.api}/${CODIGO}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    ) 
  }

  //Private Methods

  private jsonDataToPerfils(jsonData: any[]): Perfil[]{
    const perfis: Perfil[] = [];
    jsonData.forEach(element =>  perfis.push(element as Perfil));
    return perfis; 

  }

  private jsonDataToPerfil (jsonData: any): Perfil{
    return jsonData as Perfil;
  }
  private handleError(error: any):Observable<any>{
    console.log("Erro na requisição =>", error);
    return throwError(error);

  }
}
