import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel.service';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from '../../usuarios/usuario.model';
import { Perfil } from '../perfil.model';
import toastr from 'toastr';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {

  searchTerm: string;
  usuario: any;
  currentAction: string;
  usuarioForm: FormGroup;
  senhaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;


  public paginaAtual = 1;
  pageSize = 10;

  key:string = 'CODIGO'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

  perfis: Perfil[] = [];
  

  constructor(private perfilService: PerfilService,  private formBuilder: FormBuilder, private usuarioService: UsuarioService, private excelService:ExcelService) { }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.perfis, 'perfil');
 }

 isMobile = false;
 getIsMobile(): boolean {
   const w = document.documentElement.clientWidth;
   const breakpoint = 992;
   console.log(w);
   if (w < breakpoint) {
     return true;
   } else {
     return false;
   }
 }

 
  ngOnInit(): void {

    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

    this.buildUsuarioForm();
    
    this.usuarioService.getUsuario().subscribe(
      usuario => {this.usuario = usuario;

        this.usuarioForm.get('CODIGO').setValue(this.usuario.CODIGO);
        this.usuarioForm.get('COD_PERFIL_USUARIO').setValue(this.usuario.COD_PERFIL_USUARIO);
        this.usuarioForm.get('GUID').setValue(this.usuario.GUID);
        this.usuarioForm.get('NOME').setValue(this.usuario.NOME);
        this.usuarioForm.get('EMAIL').setValue(this.usuario.EMAIL);
        this.senhaForm.get('CODIGO').setValue(this.usuario.CODIGO);
      
    
      }

    
    )
   

    this.perfilService.getAll().subscribe(
     perfis =>  this.perfis = perfis,
      error => alert ("Erro ao carregar a lista"),
    )
  }
    
  submitForm(){
  

    this.submittingForm = true;

      this.updateUsuario();
      //window.location.reload();
  }
  submitFormSenha(){
  

    this.submittingForm = true;

      this. ChangePassword();
  }
  deletePerfil(perfil){
    const mustDelete = confirm("Deseja realmente excluir este item?");
    if(mustDelete){
      this.perfilService.delete(perfil.CODIGO).subscribe(
        () => this.perfis = this.perfis.filter(element =>  element != perfil),
        () => alert ("Erro ao tentar excluir!")

      )
    }
  }
  private buildUsuarioForm(){
    this.usuarioForm = this.formBuilder.group({
      GUID:[null],
      CODIGO: [null],
      COD_PERFIL_USUARIO:[null],
      NOME: [null],
      EMAIL: [null],

    });
    this.senhaForm = this.formBuilder.group({
      CODIGO: [null],
      SENHA: ['',[Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['',[Validators.required]],

    },{ validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.SENHA.value;
    let confirmPass = group.controls.confirmarSenha.value;
  
    return pass === confirmPass ? null : { notSame: true }
  }

  private updateUsuario(){
    const usuario: Usuario = Object.assign(new Usuario(), this.usuarioForm.value);
    this.usuarioService.update(usuario)
    .subscribe(
      usuario => this.actionsForSucess(usuario),
      error => this.actionsForError(error)
    )

  }
  private ChangePassword(){
    const usuario: Usuario = Object.assign(new Usuario(), this.senhaForm.value);
    this.usuarioService.change(usuario)
    .subscribe(
      usuario => this.actionsForSucess(usuario),
      error => this.actionsForError(error)
    )

  }
  private actionsForSucess(usuario: Usuario){
    toastr.success("Solicitação processada com sucesso!");


    
 
  }

  private actionsForError(error){
    this.submittingForm = false;

    if(error.status === 500)
    toastr.error("Ocorreu um erro ao processar sua solicitação!");
    else
     toastr.error("Falha na comunicação com o servidor. Por favor, tente mais tarde");

    

  }

}
