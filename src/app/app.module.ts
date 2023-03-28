import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MatImportModule } from './mat-import/mat-import.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { NetworkReceptorService } from './services/shared/network-receptor.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { MenuService } from './services/shared/menu.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    BestSellerComponent,
    HomeComponent,
    FullComponent,
    HeaderComponent,
    SidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatImportModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    MenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkReceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
