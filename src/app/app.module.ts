import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoComponent } from './photo/photo.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { config } from 'rxjs';
import { ModelsComponent } from './models/models.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotosService } from './services/photos.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { ViewPhotoComponent } from './view-photo/view-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    ModelsComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    ViewPhotoComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(config),
    ReactiveFormsModule
  ],
  providers: [PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
