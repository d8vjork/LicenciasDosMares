import { Component } from '@angular/core'
import { NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { LoginBoxComponent } from '../../components/login-box/login-box'
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';

export interface License { available: boolean; serial: string; product: Object }

@Component({
  selector: 'page-licenses',
  templateUrl: 'licenses.html',
  entryComponents: [LoginBoxComponent]
})
export class LicensesPage {
  availableModel: string = 'available'
  showSearch: boolean = false
  availableFilter$: BehaviorSubject<boolean|null>
  licenses: Observable<any[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public firebaseProvider: FirebaseProvider,
    public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present()
    this.licenses = this.firebaseProvider.getLicenses()
    loading.dismiss()
  }

  segmentChanged(event) {
    if (event.value === 'available') {
      this.filterByAvailable(true)
    } else if (event.value === 'unavailable') {
      this.filterByAvailable(false)
    }
  }

  filterByAvailable(available: boolean|null) {
    this.availableFilter$.next(available)
  }

  showOptions(license) {
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
            // this.licenseCollection.doc(license.id).delete()
          }
        }
      ]
    })

    actionSheet.present()
  }

  showLogin() {
   // TODO
  }

  addLicense() {
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
            // this.licenseCollection.add({
            //   available: (this.availableModel === 'available') ? true : false,
            //   serial: data.serial,
            //   product: data.sistema
            // })
          }
        }
      ]
    })

    prompt.present()
  }

  updateLicense(license) {
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
            // this.licenseCollection.doc(license.id).update({
            //   serial: data.serial,
            //   product: data.product
            // })
          }
        }
      ]
    })

    prompt.present()
  }

}
