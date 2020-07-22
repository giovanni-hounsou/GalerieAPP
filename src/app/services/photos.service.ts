import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Photo } from "../models/photo.model";
import { Subject } from 'rxjs';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup, FormControlName } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private photoListRef = this.db.list<Photo>('image-list')

  constructor(private db: AngularFireDatabase)  {
    /*  this.getPhotos(); */
    }
  photos: Photo[] = [];
  photo: Photo;
  photosSubject = new Subject<Photo[]>();
  private firestore: AngularFirestore;

  private imgPath = '/images';
 private dataPath= '/image-list';

//Obtenir la liste des images
    getImageList(){
      return this.photoListRef;
    }

    //Ajouter une photo
    addImage(photo: Photo){
      return this.photoListRef.push(photo);
    }


    // Supprimer une photo et ses métadatas. Elle appelle deux autres fonctions
    deleteFileUpload(photo: Photo) {
      console.log(photo);
     this.deleteFileDatabase(photo.id)
        .then(() => {
          this.deleteFileStorage(photo.ref);
        })
        .catch(error => console.log(error));
    }
   
    //Supprimer les Métadatas
    private deleteFileDatabase(id: string) {
      let itemRef = this.db.object(`${this.dataPath}/${id}`);
      console.log(itemRef);
      return itemRef.remove();
      
    }
   
    //Supprimer la photo
    private deleteFileStorage(name: string) {
      const storageRef = firebase.storage().ref();
      storageRef.child(name).delete().then(() =>{
        console.log("Fichier suprimé");
      }).catch((error) => {
        console.log(error);
      })
    }
    form = new FormGroup({
      lieu: new FormControl('')
    })

}
