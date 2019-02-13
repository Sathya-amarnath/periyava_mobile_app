import { Component, ViewChild, Inject } from '@angular/core';
import {Nav, NavController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';
import {WelcomePage} from '../pages/welcome/welcome';

import {AngularFireDatabase} from 'angularfire2/database';
import { NgZone } from '@angular/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, db: AngularFireDatabase,private zone: NgZone) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        //this.rootPage=HomePage;
        this.zone.run(()=>{
          this.nav.setRoot(HomePage);
        });
        
        unsubscribe();
      } else {
        //this.rootPage=WelcomePage;
        this.zone.run(()=>{
          this.nav.setRoot(WelcomePage);
        });
        unsubscribe();
      }
    });
    

    
  }
}

