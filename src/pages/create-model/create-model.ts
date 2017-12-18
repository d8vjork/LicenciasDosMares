import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController, ActionSheetController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import firebase from 'firebase'

import { File } from '@ionic-native/file'
import { Transfer, TransferObject } from '@ionic-native/transfer'
import { FilePath } from '@ionic-native/file-path'
import { Camera } from '@ionic-native/camera'

export interface Model { cpu: string; description: string; hdd: string; ram: string; image: string; }

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-create-model',
  templateUrl: 'create-model.html',
})
export class CreateModelPage {
  lastImage: string = null;
  modelId: string
  private modelDoc: AngularFirestoreDocument<Model>
  model: Observable<Model>

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, afs: AngularFirestore,
    public plt: Platform, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
    this.modelId = navParams.get('id')

    if (this.modelId) {
      this.modelDoc = afs.doc<Model>('models/' + this.modelId)
      this.model = this.modelDoc.valueChanges()
    }

    this.myPhotosRef = firebase.storage().ref('/models/')
  }

  confirmDelete() {
    let confirm = this.alertCtrl.create({
      title: '¿Está seguro de eliminar?',
      message: 'El modelo actual se eliminará permanentemente',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.modelDoc.delete().then(function () {
              this.navCtrl.pop()
            }).catch(function (err) {
              console.log(err)
            })
          }
        }
      ]
    })

    confirm.present()
  }

  doUpdate (data: Object) {
    this.modelDoc.update(data).then(function () {
      this.navCtrl.pop()
    }).catch(function (err) {
      console.log(err)
    })
  }

  doCreate (data: Model) {
    this.navCtrl.push(this.navCtrl.getPrevious().id, {
      model: data
    })
    // this.afs.doc<Model>('models/' + this.afs.createId()).set(data)
  }

  selectPhoto(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Subir imagen desde',
      buttons: [
        {
          text: 'Galería',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cámara',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error mientras se cargaba la imagen.');
    })
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error mientras se cargaba la imagen.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData
      this.uploadPhoto()
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error))
    })
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  private generateUUID(): any {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

    return uuid
  }
}
