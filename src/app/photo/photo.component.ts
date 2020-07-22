import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from "@angular/forms";
import { Router } from "@angular/router";
import { PhotosService } from "../services/photos.service";
import * as firebase from 'firebase';
import { Photo } from "../models/photo.model";
import { Subscription, Subject } from "rxjs";
import { FormStyle } from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photoForm: FormGroup;
  fileUrl: string;
  photos: Photo[];
  photosSubscription: Subscription;
  photosSubject = new Subject<Photo[]>();
  pHotos: Photo[];

  imageRef = '';
  
  constructor(public photoService : PhotosService, private imageP: PhotosService) { }

   
// Objet enregistrant les métadatas d'une photo
  image : Photo = {

    lieu:'',
    ref: '',
    id: '',
    url: ''
   
  }

  // enregistrer les métadatas d'une photo
  addImage(photo: Photo){
    this.imageP.addImage(this.image).then(ref =>{
      console.log(ref.key)
    })

  }

 
  public formBuilder: FormBuilder;
  
  public router: Router;
  
  
  
  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

  //Fonctions pour télécharger une photo
  onUploadFile(file: File){
    this.uploadFile(file).then(
      (url: string) =>{
        this.fileUrl = url;
      }
    );
  } 

  uploadFile(file: File){
    
    return new Promise(
      (resolve, reject) => {
        const almosteUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almosteUniqueFileName + file.name).put(file);

          const referenceimg ='images/' + almosteUniqueFileName + file.name;
          

          this.image.ref = referenceimg;
         

          
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement...');
            },
            (error)  => {
              console.log('Erreur chargement...');
              console.log(error);
              reject();
            },
            () => {
              upload.snapshot.ref.getDownloadURL().then((url) => resolve(url));
            }

            );
        
      }
    );
  }



  //Suprimmer unephoto
  deleteFileUpload(photo) {
    this.photoService.deleteFileUpload(photo);
  }



  ngOnInit() {
   
  }


}
