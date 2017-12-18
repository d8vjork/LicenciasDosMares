import { Component } from '@angular/core'
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

import { CreateDesktopPage } from '../create-desktop/create-desktop'

export interface Model { cpu: string; description: string; hdd: string; ram: string; }
export interface Desktop { name: string; model: Observable<Model> }
export interface Class { name: string; desktops: Desktop[] }

@Component({
  selector: 'page-desktops',
  templateUrl: 'desktops.html'
})
export class DesktopsPage {
  pageTitle: string
  SearchQuery: string = ''
  showSearch: boolean = false
  class: AngularFirestoreDocument<Class>
  private desktopCollection: AngularFirestoreCollection<Desktop>
  desktops: Observable<Desktop[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public navParams: NavParams, afs: AngularFirestore, public actionSheetCtrl: ActionSheetController) {
    const id = navParams.get('id')
    this.pageTitle = navParams.get('title')
    this.class = afs.doc<Class>('classes/'+id)
    this.desktopCollection = this.class.collection<Desktop>('desktops')
    this.desktops = this.desktopCollection.valueChanges()
  }

  addDesktop () {
    this.navCtrl.push(CreateDesktopPage, {
      desktop: {
        name: '',
        model: ''
      }
    })
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
            this.class.delete()
          }
        }
      ]
    })

    confirm.present()
  }

  updateClass () {
    let confirm = this.alertCtrl.create({
      title: 'Editar aula actual',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre del aula',
          value: this.pageTitle
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            this.class.update({
              name: data.nombre
            })
          }
        }
      ]
    })

    confirm.present()
  }

  updateDesktop (desktop: Desktop) {
    this.navCtrl.push(CreateDesktopPage, { desktop: desktop })
  }

}
