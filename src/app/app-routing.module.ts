import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoComponent } from "./photo/photo.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ViewPhotoComponent } from './view-photo/view-photo.component';
import { AuthGuardService } from "./services/auth-guard.service";


const routes: Routes = [
  {path: 'auth/signin', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'photo', canActivate:[AuthGuardService], component: PhotoComponent},
  {path: 'view', component: ViewPhotoComponent},
  {path: '', redirectTo: 'photo', pathMatch:'full'},
  {path: '**', redirectTo:'photo'}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
