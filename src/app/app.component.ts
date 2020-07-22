import { Component } from '@angular/core';
import * as firebase from "firebase";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'theTest';

  constructor(){
    const config = {
      apiKey: "AIzaSyBeBP7pd7MMtiSxNumsy25Lr3F_W4mjs2E",
      authDomain: "galerieapp-904a0.firebaseapp.com",
      databaseURL: "https://galerieapp-904a0.firebaseio.com",
      projectId: "galerieapp-904a0",
      storageBucket: "galerieapp-904a0.appspot.com",
      messagingSenderId: "1032342947308",
      appId: "1:1032342947308:web:b5668104d67702f1ccacc9",
      measurementId: "G-BL1SV5FYKN"
    };
    firebase.initializeApp(config)
  }
}
