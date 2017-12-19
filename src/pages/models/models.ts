import { Component } from '@angular/core'
import { NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

import { CreateModelPage } from '../create-model/create-model'

export interface Model { cpu: string; description: string; hdd: string; ram: string; }
export interface ModelId extends Model { id: string; }

@Component({
  selector: 'page-models',
  templateUrl: 'models.html'
})
export class ModelsPage {
  showSearch: boolean = false
  private modelCollection: AngularFirestoreCollection<Model>
  models: Observable<ModelId[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, afs: AngularFirestore, 
  public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present()

    this.modelCollection = afs.collection<Model>('models')
    this.models = this.modelCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Model
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })

    loading.dismiss()
  }

  addModel () {
    this.navCtrl.push(CreateModelPage)
  }

  updateModel (modelId) {
    this.navCtrl.push(CreateModelPage, {
      id: modelId
    })
  }
}
