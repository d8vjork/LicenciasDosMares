import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

export interface Model { description: string }
export interface ModelId extends Model { id: string }

@IonicPage()
@Component({
  selector: 'page-create-desktop',
  templateUrl: 'create-desktop.html',
})
export class CreateDesktopPage {
  desktop: Object
  modelCollection: AngularFirestoreCollection<Model>
  models: Observable<ModelId[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    afs: AngularFirestore) {
    this.desktop = navParams.get('desktop')

    this.modelCollection = afs.collection<Model>('models')
    this.models = this.modelCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Model
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })
  }

}
