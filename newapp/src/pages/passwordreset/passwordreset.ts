import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HomePage} from '../home/home';

import {AuthProvider} from '../../providers/auth/auth';
import {AngularFireAuth} from 'angularfire2/auth';
/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  public resetPasswordForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
      public formBuilder: FormBuilder, 
      public alertCtrl: AlertController,
      public authProvider: AuthProvider,
      public fire: AngularFireAuth) {
        this.resetPasswordForm = formBuilder.group({
          email: ["",Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')])]
        });
  }

  alert(message:string){
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authProvider.resetPassword(this.resetPasswordForm.value.email)
      .then((user)=>{
        this.alert("you will recieve a mail with a link to update your password");  
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error)=>{
        this.alert(error);
      });
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

}
