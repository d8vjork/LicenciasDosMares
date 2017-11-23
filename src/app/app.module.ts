import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

// AF2 Settings
import firebaseConfig from './config.development'

import { ModelsPage } from '../pages/models/models'
import { DesktopsPage } from '../pages/desktops/desktops'
import { LicensesPage } from '../pages/licenses/licenses'
import { ClassesPage } from '../pages/classes/classes'
import { TabsPage } from '../pages/tabs/tabs'
import { LoginPage } from '../pages/login/login'
import { CreateDesktopPage } from '../pages/create-desktop/create-desktop'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

@NgModule({
  declarations: [
    MyApp,
    ModelsPage,
    DesktopsPage,
    LicensesPage,
    ClassesPage,
    LoginPage,
    CreateDesktopPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModelsPage,
    DesktopsPage,
    LicensesPage,
    ClassesPage,
    LoginPage,
    CreateDesktopPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
