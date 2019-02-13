import { Component,ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { RestProvider } from '../../providers/rest/rest';

import {HomePage} from '../home/home';
import {WelcomePage} from '../welcome/welcome';

/**
 * Generated class for the CountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-count',
  templateUrl: 'count.html',
})
export class CountPage {
  
  slokaname:String;
  yr_date: String =new Date().getFullYear().toString();
  
  start_date:String=this.yr_date+"-01-01";
  countform:any={
    user_id: localStorage.getItem('loc_id'),
    date_slokam:'',
    slokam:'',
    count_slokam: parseInt(''),
    timestamp:new Date().toString()
  }
  
  myDate: String = new Date().toJSON().split('T')[0];
  formgroup_count: FormGroup;
  public loading: Loading;
  categories:any;
  constructor(private fire: AngularFireAuth,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    private alertctrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams,
    public formbuilder:FormBuilder,
    public restProvider: RestProvider
    ) {
      this.formgroup_count=formbuilder.group({
        date:["",Validators.required],
        sloka:["",Validators.required],
        sloka_count:["",Validators.compose([Validators.required])]
        
      });
      this.getCateg();
      
  }

  getCateg() {
    this.restProvider.getCategories()
    .then(data => {
      this.categories = data;
      console.log(this.categories);
    });
    
  }
  


  ionViewDidLoad() {
    console.log('ionViewDidLoad CountPage');
    //console.log(this.myDate);
    //console.log(typeof(this.start_date));
  }

  alert(message:string){
    this.alertctrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  

  onSubmit_count(value:any):void{
    if(this.formgroup_count.valid){
      //alert(JSON.stringify(this.countform));
      this.restProvider.sendCount(this.countform).then((result) => {
        console.log(result);
  
        
        //console.log(result);
        localStorage.setItem("lcl_sloka",this.countform.slokam);        
        //this.alert("chant count submitted");
        this.navCtrl.push(WelcomePage);
      }, (err) => {
        alert('into error');
        console.log(err);
      });
      
      
  }
  

}
}
//sendCount