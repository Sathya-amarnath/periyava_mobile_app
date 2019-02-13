import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

import { RestProvider } from '../../providers/rest/rest';
import {HomePage} from '../home/home';
import {CountPage} from '../count/count';
import {SummaryPage} from '../summary/summary';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  fname:any=localStorage.getItem('loc_fnm');
  sloka:any=localStorage.getItem("lcl_sloka");
  id:any=localStorage.getItem("loc_id");
  sumofchants:any;
  sumtotal:any;
  count_id_sloka={
    user_id:this.id,
    slokam:this.sloka
  }
  //@ViewChild(CountPage) child;
  constructor(private alertctrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams,
    private fire:AngularFireAuth,
    public authProvider: AuthProvider,
    public restProvider: RestProvider
    ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  alert(message:string){
    this.alertctrl.create({
      title: 'Summary',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  goToCount(){
    this.navCtrl.push(CountPage);
  }

  goToSummary(){
    
    //this.count_id_sloka
    this.restProvider.showCount(this.count_id_sloka).then((result) => {
      console.log(result);

      
      console.log(JSON.stringify(result));
      //alert(result.Updated.ttl)
       this.sumofchants=result;
       //(JSON.stringify(this.sumofchants.Updated[0].total)); 
      //alert(this.sumofchants.Updated.total);
      this.sumtotal=JSON.stringify(this.sumofchants.Updated[0].total);
      this.alert("The total chant count for "+this.sloka+" is "+this.sumtotal);
    }, (err) => {
      alert('into error');
      console.log(err);
    });
  }

  logout(){
    /*this.user=firebase.auth().currentUser.email;
     alert(this.user);*/
     this.authProvider.logoutUser().then(data=> {
       this.alert("Signout successful");
       this.navCtrl.setRoot(HomePage);
     }).catch(function(error) {
       // An error happened.
       this.alert("error");
     });
    
   }
}
