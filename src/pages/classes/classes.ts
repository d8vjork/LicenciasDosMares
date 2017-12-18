import { Component } from '@angular/core'
import { NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { DesktopsPage } from '../desktops/desktops'

export interface Desktop { name: string }
export interface Class { name: string, desktops: Observable<Desktop[]> }
export interface ClassId extends Class { id: string }

@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html'
})
export class ClassesPage {
  SearchQuery: string = ''
  showSearch: boolean = false
  private classCollection: AngularFirestoreCollection<Class>
  classes: Observable<ClassId[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, afs: AngularFirestore,
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present()

    this.classCollection = afs.collection<Class>('classes')
    this.classes = this.classCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Class
        const id = a.payload.doc.id

        // Get all desktops of the class
        data.desktops = this.classCollection.doc<Class>(id).collection<Desktop>('desktops').valueChanges()
        return { id, ...data }
      })
    })

    loading.dismiss()
    // console.log(this.classCollection.doc<Desktop>('desktops'))
  }

  showOptions (classId: string, className: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '¿Qué desea hacer?',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.classCollection.doc(classId).update({
              name: className
            })
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.classCollection.doc(classId).delete()
          }
        }
      ]
    })

    actionSheet.present()
  }

  addClass () {
    let prompt = this.alertCtrl.create({
      title: 'Añadir aula',
      message: "Introduzca el aula a añadir",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre del aula'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data) => {}
        },
        {
          text: 'Añadir',
          handler: (data) => {
            this.classCollection.add({
              name: data.name,
              desktops: null
            })
          }
        }
      ]
    })

    prompt.present()
  }

  pushDesktopPage (classId: string, className: string) {
    this.navCtrl.push(DesktopsPage, {
      id: classId,
      title: className
    })
  }

}


