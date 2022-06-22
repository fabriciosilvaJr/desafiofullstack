import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { HeaderComponent } from './core/components/header/header.component';
import { AuthService } from './core/services/auth.service';
import { HomeComponent } from './core/components/layout/home/home.component';
import { AuthenticationComponent } from './core/components/layout/authentication/authentication.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { IMaskModule } from 'angular-imask';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';









@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AuthenticationComponent,
    RegisterComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    ConfirmDialogModule
  
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService,
    AuthGuard,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
