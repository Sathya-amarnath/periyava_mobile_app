import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CountPage} from '../pages/count/count';
import {RegisterPage} from '../pages/register/register';
import {PasswordresetPage} from '../pages/passwordreset/passwordreset';
import {WelcomePage} from '../pages/welcome/welcome';
import {SummaryPage} from '../pages/summary/summary';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
//import { Facebook } from '@ionic-native/facebook/ngx';
import firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { DataProvider } from '../providers/data/data';

const firebaseAuth= {
  apiKey: "AIzaSyBl3VrglOy0lsdb_KB4oQfD-nKqNZpjPfc",
  authDomain: "slokas-24c96.firebaseapp.com",
  databaseURL: "https://slokas-24c96.firebaseio.com",
  projectId: "slokas-24c96",
  storageBucket: "slokas-24c96.appspot.com",
  messagingSenderId: "753697603633"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CountPage,
    RegisterPage,
    PasswordresetPage,
    WelcomePage,
    SummaryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CountPage,
    RegisterPage,
    PasswordresetPage,
    WelcomePage,
    SummaryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Facebook,
    AuthProvider,
    RestProvider,
    DataProvider
  ]
})
export class AppModule {}
