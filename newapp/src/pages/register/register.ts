import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import {CountPage} from '../count/count';

import {AngularFireAuth} from 'angularfire2/auth';
import {AuthProvider} from '../../providers/auth/auth';
import {HomePage} from '../home/home';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  formgroup: FormGroup;
  @ViewChild('ema') email;
  @ViewChild('pas') password;
  @ViewChild('fname') fname;
  @ViewChild('lname') lname;
  @ViewChild('mobile') mob;
  public loading: Loading;

  /*user={
    first_name: this.fname,  
    last_name:this.lname,
    email: this.email,
    mobile: this.mob
  };*/
  name:any;
  user={
    first_name: '',  
    last_name:'',
    email: '',
    mobile: ''
  };

  constructor(private fire: AngularFireAuth,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    private alertctrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams,
    public formbuilder:FormBuilder,
    public restProvider: RestProvider
  ) {
    this.formgroup=formbuilder.group({
      firstname:["",Validators.required],
      lastname:["",Validators.required],
      emailid:["",Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')])],
      pass:["",Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$'), 
      Validators.minLength(6),Validators.maxLength(12)])],
      retype_pass:["",Validators.required],
      mobile:["",Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[0-9]+') ])]
    });
  }

  alert(message:string){
    this.alertctrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit(value:any):void{
    if(this.formgroup.valid){
     


    this.authProvider.signupUser(this.email.value,this.password.value).then((res)=>{
      //api here and api success alert.

     this.restProvider.addUser(this.user).then((result) => {
      console.log(result);

      
      //console.log(result);
      this.alert("You will recieve email. Verify your account by clicking the link");
        
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      alert('into error');
      console.log(err);
    });
        
      })
      .catch(error =>{
        this.alert(error);
      });
      console.log("successful registration");
    }
    else{
      console.log("error");
    }
  }

}
