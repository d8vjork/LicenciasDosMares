import { Component } from '@angular/core'
import { NavController, AlertController, ActionSheetController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

export interface License { available: boolean; serial: string; product: Object }
export interface LicenseId extends License { id: string; }

@Component({
  selector: 'page-licenses',
  templateUrl: 'licenses.html'
})
export class LicensesPage {
  availableModel: string = 'available'
  showSearch: boolean = false
  availableFilter$: BehaviorSubject<boolean|null>
  private licenseCollection: AngularFirestoreCollection<License>
  licenses: Observable<LicenseId[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public afs: AngularFirestore, public actionSheetCtrl: ActionSheetController) {
    this.availableFilter$ = new BehaviorSubject(true)
    this.licenseCollection = afs.collection<License>('licenses')

    this.licenses = Observable.combineLatest(
      this.availableFilter$
    ).switchMap(([available]) =>
      afs.collection<License>('licenses', ref =>
        ref.where('available', '==', available)
      ).snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as License
          const id = a.payload.doc.id
          return { id, ...data }
        })
      })
    )
  }

  segmentChanged (event) {
    if (event.value === 'available') {
      this.filterByAvailable(true)
    } else if (event.value === 'unavailable') {
      this.filterByAvailable(false)
    }
  }

  filterByAvailable (available: boolean|null) {
    this.availableFilter$.next(available)
  }

  showOptions (license) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.updateLicense(license)
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.licenseCollection.doc(license.id).delete()
          }
        }
      ]
    })

    actionSheet.present()
  }

  addLicense () {
    let prompt = this.alertCtrl.create({
      title: 'Añadir licencia',
      message: "Introduzca la licencia a añadir",
      inputs: [
        {
          name: 'serial',
          placeholder: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'
        },
        {
          name: 'sistema',
          placeholder: 'Win10, Win7...'
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
            this.licenseCollection.add({
              available: true,
              serial: data.serial,
              product: data.sistema
            })
          }
        }
      ]
    })

    prompt.present()
  }

  updateLicense (license) {
    let prompt = this.alertCtrl.create({
      title: 'Actualizar licencia',
      message: "Actualizar datos de la licencia",
      inputs: [
        {
          name: 'serial',
          placeholder: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
          value: license.serial
        },
        {
          name: 'product',
          placeholder: 'Win10, Win7...',
          value: license.product
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data) => {}
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.licenseCollection.doc(license.id).update({
              serial: data.serial,
              product: data.product
            })
          }
        }
      ]
    })

    prompt.present()
  }

}
