import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  //Fonction qui crée un nouvel utilisateur et l'ajoute à la base de Données
  createNewUser(email:string, password: string){
    return new Promise(
      (resolve, reject) =>  {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          ()=>{
            resolve();
          }, 
          (error) =>{
            reject(error);
          }
        );
      }
    );
  }

  // Fonction permettant d'authentifier un utilisateur
  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // Fonction pour déconnecter un utilisateur
  signOutUser(){
    firebase.auth().signOut();
  }

  constructor() { }
}
