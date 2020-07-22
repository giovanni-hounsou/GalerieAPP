import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { Photo } from "../models/photo.model";
import { PhotosService } from "../services/photos.service";
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.component.html',
  styleUrls: ['./view-photo.component.scss']
})
export class ViewPhotoComponent implements OnInit {

  router: Router;
  photo: Photo;
  images = [];
  isAuth: boolean;

  constructor( public afDB: AngularFireDatabase, public afSG: AngularFireStorage, private photoService: PhotosService) {
    this.getImagesDatabase();
   }

   //Accéder aux Métadatas
  getImagesDatabase(){
    
  this.afDB.list('image-list').snapshotChanges(['child_added']).subscribe(images =>{
    images.forEach(image =>{
      console.log(image);
      this.getImagesStorage(image);
      console.log('Reférence de l\'image: ' + image.payload.exportVal().ref);

      
    });
  });

  }

  //Accéder aux photos
  getImagesStorage(image: any){
    const imgRef = image.payload.exportVal().ref;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {

      this.images.push({
        id: image.key,
        lieu: image.payload.exportVal().lieu,
        url : imgUrl,
        ref: imgRef
      });
    });

  }

//Supprimer photos
  deleteFileUpload(photo) {
    this.photoService.deleteFileUpload(photo);
    this.router.navigate(['photos']);
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user){
          this.isAuth = true;
        }
        else{
          this.isAuth = false;
        }
      }
    );
  }
}
