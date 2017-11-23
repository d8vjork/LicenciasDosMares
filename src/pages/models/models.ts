import { Component } from '@angular/core'
import { NavController, AlertController, ActionSheetController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

export interface Model { cpu: string; description: string; hdd: string; ram: string; }

@Component({
  selector: 'page-models',
  templateUrl: 'models.html'
})
export class ModelsPage {
  showSearch: boolean = false
  private modelCollection: AngularFirestoreCollection<Model>
  models: Observable<Model[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    afs: AngularFirestore, public actionSheetCtrl: ActionSheetController) {
    this.modelCollection = afs.collection<Model>('models')
    this.models = this.modelCollection.valueChanges()
  }

}
