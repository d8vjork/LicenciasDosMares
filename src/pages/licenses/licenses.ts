import { Component } from '@angular/core'
import { NavController, AlertController, ActionSheetController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

export interface Product { name: string; slug: string }
export interface License { available: boolean; serial: string; product: Object }

@Component({
  selector: 'page-licenses',
  templateUrl: 'licenses.html'
})
export class LicensesPage {
  // licenses: string = 'available'
  showSearch: boolean = false
  private licenseCollection: AngularFirestoreCollection<License>
  private productCollection: AngularFirestoreCollection<Product>
  licenses: Observable<License[]>
  products: Observable<Product[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    afs: AngularFirestore, public actionSheetCtrl: ActionSheetController) {
    this.licenseCollection = afs.collection<License>('licenses')
    this.licenses = this.licenseCollection.valueChanges()

    this.productCollection = afs.collection<Product>('products')
    this.products = this.productCollection.valueChanges()
  }

  showOptions(licenseId, licenseSerial) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.updateLicense(licenseId, licenseSerial)
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.licenseCollection.doc(licenseId).delete()
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
          placeholder: 'Sistema operativo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Añadir',
          handler: data => {
            if (data.serial == null || data.serial == '')
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

  updateLicense(licenseId, licenseTitle){
    let prompt = this.alertCtrl.create({
      title: 'Actualizar licencia',
      message: "Actualizar datos de la licencia",
      inputs: [
        {
          name: 'serial',
          placeholder: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
          value: licenseTitle
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Guardar',
          handler: data => {
            this.licenseCollection.doc(licenseId).update({
              serial: data.serial,
              product: data.sistema
            })
            // this.items.update(licenseId, {
            //   serial: data.serial,
            //   product: data.sistema
            // })
          }
        }
      ]
    })

    prompt.present()
  }

}
