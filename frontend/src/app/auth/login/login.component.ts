import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/pages/usuarios/usuario.model';
import toastr from 'toastr';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ConfirmationService]
})
export class LoginComponent implements OnInit {
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  public usuario: Usuario = new Usuario();


  loginForm: FormGroup = this.fb.group({
    EMAIL: ['',[Validators.required, Validators.email]],
    SENHA:['',[Validators.required, Validators.minLength(6)]],
    accept:['']
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private confirmationService: ConfirmationService,


    ) { }


  ngOnInit(): void {
    this.loginForm.get('EMAIL').valueChanges.subscribe(event => {
      this.loginForm.get('EMAIL').setValue(event.toLowerCase(), {emitEvent: false});
 
   });
  }


  onSubmit(){
    this.submittingForm = true;

    const credentials = this.loginForm.value;
    this.authservice.login(credentials)
      .subscribe(
        (usuario) =>{
          //console.log(usuario),
          this.actionsForSucess(usuario)
        },
        (error) =>{
          console.log(error);
          this.actionsForError(error);
    

        }
      )
  }

  
  private actionsForSucess(usuario: Usuario){
    toastr.success("Login realizado com sucesso!");
   
    setTimeout(() => {
      this.router.navigateByUrl("/")
    }
    , 1000);

  }

  private actionsForError(error){
    

    this.submittingForm = false;

    if(error.status === 401)
       toastr.error("Usuário ou senha invalida");
      else if(error.status === 409){
          this.confirmationService.confirm({
            message: 'Usuário já está logado, deseja continuar e desconectar do outro dispositivo?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.loginForm.get('accept').setValue(true)  
              const credentials = this.loginForm.value;
              this.authservice.login(credentials)
                .subscribe(
                  (usuario) =>{
                    //console.log(usuario),
                    this.actionsForSucess(usuario)
                  }
        
              ) 
          },
          reject: () => {
            this.loginForm.get('accept').setValue(false)
            const credentials = this.loginForm.value;
            this.authservice.login(credentials)
              .subscribe(
                (usuario) =>{
                  //console.log(usuario),
                  this.actionsForSucess(usuario)
                }
      
            )
          }
        });
           
  
     }
    else 
       toastr.error("Falha na comunicação com o servidor. Por favor, tente mais tarde");
 

  }





}
