
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Usuario } from '../../pages/usuarios/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  GUID = window.localStorage.getItem('guid')
  ID = window.localStorage.getItem('id')


  private api: string = (environment.api + "usuarios" ) 

  constructor(private http: HttpClient) { }
  getAll(): Observable<Usuario[] >{

    return this.http.get(`${this.api}/${this.GUID}`).pipe(
      catchError(this.handleError),
      map (this.jsonDataToUsuarios)
    )

  }
  getUsuario(): Observable<Usuario[] >{

    return this.http.get(`${this.api}/${this.ID}/${this.GUID}`).pipe(
      map (this.jsonDataToUsuario),
      catchError(this.handleError),
     
    )

  }

  getById(CODIGO: number): Observable<Usuario>{
    const url = `${this.api}/${CODIGO}/${this.GUID}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToUsuario)
    )

  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post(this.api, usuario).pipe(
      catchError(this.handleError),

    )
  }

  update(usuario: Usuario){
    const url = `${this.api}`;
    return this.http.patch(url, usuario).pipe(
      map(() => usuario),
      catchError(this.handleError)
    )
  } 
  
  change(usuario: Usuario){
    const url = `${this.api}/change-password`;
    return this.http.put(url, usuario).pipe(
      map(() => usuario),
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

  private jsonDataToUsuarios(jsonData: any[]): Usuario[]{
    const usuarios: Usuario[] = [];
    jsonData.forEach(element =>  usuarios.push(element as Usuario));
    return usuarios; 

  }

  private jsonDataToUsuario (jsonData: any): Usuario{
    return jsonData as Usuario;
  }
  private handleError(error: any):Observable<any>{
    console.log("Erro na requisição =>", error);
    return throwError(error);

  }
}
