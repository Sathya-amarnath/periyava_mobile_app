
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public fire: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  //login
  loginUser(email: string, password: string): Promise<any> {

    
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //signup
  //signup
  signupUser(email: string, password: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password).then((user)=>{
      this.emailverify();
    });
  }

  //emailverify
  emailverify(){
    return  firebase.auth().currentUser.sendEmailVerification().then((success=>{
      console.log('email verified');
    }));
    
  }

  //reset pwd
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  //logout
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

}
