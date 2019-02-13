import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import {CountPage} from '../count/count';
import {RegisterPage} from '../register/register';
import {PasswordresetPage} from '../passwordreset/passwordreset';
import {WelcomePage} from '../welcome/welcome';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthProvider} from '../../providers/auth/auth';
import { RestProvider } from '../../providers/rest/rest';

//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  json_res:any
  user_login={
    
    email: ''
    
  };
  public formgroup_login: FormGroup;
  @ViewChild('ema_login') email_log;
  @ViewChild('pas_login') password_log;
  public loading: Loading;

  constructor(private alertctrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder:FormBuilder,
    public authProvider: AuthProvider,
    public fire: AngularFireAuth,
    //private fb: Facebook
    public restProvider: RestProvider
    ) {
      this.formgroup_login=formbuilder.group({
        emailid:["",Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')])],
        pass:["",Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$'), 
        Validators.minLength(6),Validators.maxLength(12)])]
      });
    

  }

  alert(message:string){
    this.alertctrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  onsubmit(value:any):void{
    if(this.formgroup_login.valid){
     this.authProvider.loginUser(this.email_log.value, this.password_log.value)
      .then((data)=>{
        if(this.fire.auth.currentUser.emailVerified){
        //this.alert("login successful");
        //service writing
        this.restProvider.loginUser(this.user_login).then(result=>{
          console.log(JSON.stringify(result));
         // alert(JSON.stringify(result));
         this.json_res = result;
        //var jsres = JSON.stringify(result);
        //var res =JSON.parse(jsres);
         //console.log("LOGGGG...."+res);
         //console.log("LOGGGG...."+res.createdUser);
         //console.log("LOGGGG...."+res.createdUser.first_name);
         localStorage.setItem('loc_fnm', this.json_res.createdUser.first_name);
         localStorage.setItem('loc_id', this.json_res.createdUser._id);
         localStorage.setItem('loc_email', this.json_res.createdUser.email);

         //var x= localStorage.getItem('loc_fnm');
         //var y = localStorage.getItem('loc_id');
         //alert ('first name is '+x + '       '+y);
         this.navCtrl.setRoot(WelcomePage);
        })
        .catch(err=>{
          console.log(err);
        });
        
        }
        else{
          this.alert("Verify your email");
        }
      })
      .catch((error)=>{
        this.alert(error);
      });
      
    }
    
    else{
      console.log("error");
    }
  }

  goToSignup(){
    this.navCtrl.push(RegisterPage);
  }
  passwordreset(){
    this.navCtrl.push(PasswordresetPage);
  }
  
/*
  loginFB(){
    
    this.fb.login(['email']).then(res=>{
      const fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(fc).then(fs=>{
        console.log("success");
        this.alert("firebase success");
      }).catch(ferr=>{
        this.alert("firebase error");
      })
    }).catch(err=>{
      this.alert(JSON.stringify(err));
    })
    
  }
*/
}
