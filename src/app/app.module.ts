import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'

// Import the AF2 Module
import { HttpModule } from '@angular/http'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FirebaseProvider } from './../providers/firebase/firebase'

// AF2 Settings
import firebaseConfig from './config.development'

import { ModelsPage } from '../pages/models/models'
import { DesktopsPage } from '../pages/desktops/desktops'
import { LicensesPage } from '../pages/licenses/licenses'
import { ClassesPage } from '../pages/classes/classes'
import { TabsPage } from '../pages/tabs/tabs'
import { CreateDesktopPage } from '../pages/create-desktop/create-desktop'
import { CreateModelPage } from '../pages/create-model/create-model'
import { LoginBoxComponent } from '../components/login-box/login-box'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { File } from '@ionic-native/file'
import { Transfer } from '@ionic-native/transfer'
import { FilePath } from '@ionic-native/file-path'
import { Camera } from '@ionic-native/camera'

@NgModule({
  declarations: [
    MyApp,
    ModelsPage,
    DesktopsPage,
    LicensesPage,
    ClassesPage,
    CreateDesktopPage,
    CreateModelPage,
    LoginBoxComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    // AngularFirestoreModule.enablePersistence()
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModelsPage,
    DesktopsPage,
    LicensesPage,
    ClassesPage,
    CreateDesktopPage,
    CreateModelPage,
    LoginBoxComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
