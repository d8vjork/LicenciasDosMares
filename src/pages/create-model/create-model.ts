import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { Camera } from '@ionic-native/camera'
import firebase from 'firebase'

export interface Model { cpu: string; description: string; hdd: string; ram: string; image: string; }

@IonicPage()
@Component({
  selector: 'page-create-model',
  templateUrl: 'create-model.html',
})
export class CreateModelPage {
  modelId: string
  private modelDoc: AngularFirestoreDocument<Model>
  model: Observable<Model>

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public camera: Camera, afs: AngularFirestore) {
    this.modelId = navParams.get('id')

    if (this.modelId) {
      this.modelDoc = afs.doc<Model>('models/' + this.modelId)
      this.model = this.modelDoc.valueChanges()
    }

    this.myPhotosRef = firebase.storage().ref('/models/')
  }

  confirmDelete () {
    let confirm = this.alertCtrl.create({
      title: '¿Está seguro de eliminar?',
      message: 'El aula actual se eliminará permanentemente',
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
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData
      this.uploadPhoto()
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error))
    })
  }

  takePhoto () {
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

  private uploadPhoto (): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  private generateUUID (): any {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

    return uuid
  }
}
