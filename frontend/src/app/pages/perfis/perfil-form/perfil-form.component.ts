import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PerfilService } from 'src/app/core/services/perfil.service';
import toastr from 'toastr';
import { Perfil } from '../perfil.model';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit,  AfterContentChecked {

  currentAction: string;
  perfilForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  perfil: Perfil = new Perfil();

  constructor(
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildPerfilForm();
    this.loadPerfil();
  
  
  }
  ngAfterContentChecked(){
    this.setPageTitle();

  }
  get CODIGO() {return this.perfilForm.get('CODIGO')}; 
  submitForm(){
    this.submittingForm = true;
   
 
    if(this.currentAction == "new")
    {this.CODIGO.setValue(-1); 
      this.createPerfil();}

    else
      this.updatePerfil();
  }

  // Private Methods

  private setCurrentAction(){
   if(this.route.snapshot.url[0].path == "new")
      this.currentAction ="new"
   else
      this.currentAction ="edit"
  }

  private buildPerfilForm(){
    const guid = window.localStorage.getItem('guid')
    this.perfilForm = this.formBuilder.group({
      GUID:[guid],
      CODIGO: [null],
      PERFIL:['T'],
      DESCRICAO: [null, [Validators.required, Validators.minLength(2)]],
      SITUACAO: ['A']
    });
  }



  private loadPerfil(){
    if(this.currentAction == "edit"){

      this.route.paramMap.pipe(
        switchMap(params => this.perfilService.getById(+params.get("id")))
      )
      .subscribe(
        (perfil) => {
          this.perfil = perfil;
          this.perfilForm.patchValue(perfil) // binds loaded perfil data to PerfilForm
        },
        (errror) => alert('Ocorreu um errro no servidor, tente mais tarde.')
      )

    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle= "Nova Perfil"
    else{
      const perfilName = this.perfil.DESCRICAO ||  ""
      this.pageTitle = "Editar Perfil";

    }
  }
 
  private createPerfil(){
    const perfil: Perfil = Object.assign(new Perfil(), this.perfilForm.value);
 
    this.perfilService.create(perfil)
      .subscribe(
        perfil => this.actionsForSucess(perfil),
        error => this.actionsForError(error)
      )

      
      

  }

  private updatePerfil(){
    const perfil: Perfil = Object.assign(new Perfil(), this.perfilForm.value);
    this.perfilService.update(perfil)
    .subscribe(
      perfil => this.actionsForSucess(perfil),
      error => this.actionsForError(error)
    )

  }

  private actionsForSucess(perfil: Perfil){
    toastr.success("Solicitação processada com sucesso!");

    // redirect / reload component page
    this.router.navigateByUrl("perfis").then(
      ( ) => this.router.navigate(["perfis", perfil.CODIGO, "new"])
    )
  }

  private actionsForError(error){
    toastr.error("Ocorreu um erro ao processar sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errrors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde"]

    

  }


}
